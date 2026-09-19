const DEFAULT_API_REVALIDATION_SECONDS = 10;

/**
 * Resolves a relative API path against the configured server URL.
 * @returns An absolute API URL, or null when the configuration is missing or invalid
 * @requires API_BASE_URL - Absolute HTTP(S) URL of the API server
 */
export function resolveApiUrl(path: string): string | null {
	const baseUrl = process.env.API_BASE_URL?.trim();

	if (!baseUrl) {
		return null;
	}

	try {
		const url = new URL(path, baseUrl);
		if (url.protocol !== "http:" && url.protocol !== "https:") {
			return null;
		}

		return url.toString();
	} catch {
		return null;
	}
}

/**
 * Fetches a public API resource with the site's shared cache policy.
 * @param path - API path beginning with a slash
 * @returns The API response, or null when API_BASE_URL is not configured
 */
export function fetchApi(
	path: string,
	revalidate = DEFAULT_API_REVALIDATION_SECONDS,
): Promise<Response | null> {
	const url = resolveApiUrl(path);

	if (!url) {
		return Promise.resolve(null);
	}

	return fetch(url, {
		next: { revalidate },
	});
}
