export async function register(): Promise<void> {
	if (process.env.NEXT_RUNTIME !== "nodejs") {
		return;
	}

	const [{ setMusicCatalog }, { synchronizeMusicCatalog }] = await Promise.all([
		import("@/lib/music"),
		import("@/lib/sync"),
	]);
	setMusicCatalog(await synchronizeMusicCatalog());
}
