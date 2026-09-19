import { resolveApiUrl } from "@/lib/api";
import { parseMusicCatalog, type SyncedMusic } from "@/lib/music";

interface TokenResponse {
	access_token: string;
	expires_in: number;
}

let cachedToken: { value: string; expiresAt: number } | undefined;

function requiredEnvironmentVariable(name: string): string {
	const value = process.env[name]?.trim();
	if (!value) {
		throw new Error(`${name} must be configured.`);
	}

	return value;
}

async function fetchM2MToken(): Promise<string> {
	if (cachedToken && cachedToken.expiresAt > Date.now()) {
		return cachedToken.value;
	}

	const issuer = requiredEnvironmentVariable("AUTH0_ISSUER").replace(/\/$/, "");
	const response = await fetch(`${issuer}/oauth/token`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			grant_type: "client_credentials",
			client_id: requiredEnvironmentVariable("AUTH0_M2M_CLIENT_ID"),
			client_secret: requiredEnvironmentVariable("AUTH0_M2M_CLIENT_SECRET"),
			audience: requiredEnvironmentVariable("AUTH0_AUDIENCE"),
		}),
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error(
			`Auth0 token request failed with status ${response.status}.`,
		);
	}

	const token = (await response.json()) as Partial<TokenResponse>;
	if (
		typeof token.access_token !== "string" ||
		typeof token.expires_in !== "number" ||
		!Number.isFinite(token.expires_in) ||
		token.expires_in <= 0
	) {
		throw new Error(
			"Auth0 token response does not match the expected contract.",
		);
	}

	cachedToken = {
		value: token.access_token,
		expiresAt: Date.now() + Math.max(token.expires_in - 60, 1) * 1000,
	};
	return token.access_token;
}

/**
 * Synchronizes the server-owned music catalog before the Next.js server accepts requests.
 * @requires API_BASE_URL - Absolute HTTP(S) URL of the API server
 * @requires AUTH0_AUDIENCE - Auth0 API audience accepted by server
 * @requires AUTH0_ISSUER - Auth0 tenant issuer URL
 * @requires AUTH0_M2M_CLIENT_ID - Client ID for the web M2M application
 * @requires AUTH0_M2M_CLIENT_SECRET - Client secret for the web M2M application
 */
export async function synchronizeMusicCatalog(): Promise<SyncedMusic[]> {
	const url = resolveApiUrl("/sync");
	if (!url) {
		throw new Error("API_BASE_URL must be configured with an HTTP(S) URL.");
	}

	const response = await fetch(url, {
		headers: { authorization: `Bearer ${await fetchM2MToken()}` },
		cache: "no-store",
	});
	if (!response.ok) {
		throw new Error(
			`Music synchronization failed with status ${response.status}.`,
		);
	}

	const catalog = parseMusicCatalog(await response.json());
	if (!catalog) {
		throw new Error(
			"Music synchronization response does not match the API contract.",
		);
	}

	return catalog;
}
