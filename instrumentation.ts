export async function register(): Promise<void> {
	if (process.env.NEXT_RUNTIME !== "nodejs") {
		return;
	}

	const { synchronizeMusicCatalog } = await import("@/lib/sync");
	await synchronizeMusicCatalog();
}
