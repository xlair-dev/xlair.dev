export interface SyncedSheet {
	id: string;
	musicId: string;
	difficulty: "basic" | "advanced" | "master";
	level: number;
	notesDesigner: string;
}

export interface SyncedMusic {
	id: string;
	title: string;
	artist: string;
	bpm: number;
	genre: string;
	registrationDate: string;
	isTest: boolean;
	sheets: readonly SyncedSheet[];
}

let musicCatalog: readonly SyncedMusic[] | undefined;

export function setMusicCatalog(catalog: readonly SyncedMusic[]): void {
	musicCatalog = catalog;
}

export function getMusicCatalog(): readonly SyncedMusic[] {
	if (!musicCatalog) {
		throw new Error("Music catalog has not been synchronized.");
	}

	return musicCatalog;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function isDifficulty(value: unknown): value is SyncedSheet["difficulty"] {
	return value === "basic" || value === "advanced" || value === "master";
}

function parseSheet(value: unknown): SyncedSheet | null {
	if (!isRecord(value)) {
		return null;
	}

	const { id, musicId, difficulty, level, notesDesigner } = value;
	if (
		typeof id !== "string" ||
		typeof musicId !== "string" ||
		!isDifficulty(difficulty) ||
		typeof level !== "number" ||
		!Number.isFinite(level) ||
		typeof notesDesigner !== "string"
	) {
		return null;
	}

	return { id, musicId, difficulty, level, notesDesigner };
}

function parseMusic(value: unknown): SyncedMusic | null {
	if (!isRecord(value) || !Array.isArray(value.sheets)) {
		return null;
	}

	const music = value.music;
	if (!isRecord(music)) {
		return null;
	}

	const { id, title, artist, bpm, genre, registrationDate, isTest } = music;
	const sheets = value.sheets.map(parseSheet);
	if (
		typeof id !== "string" ||
		typeof title !== "string" ||
		typeof artist !== "string" ||
		typeof bpm !== "number" ||
		!Number.isFinite(bpm) ||
		typeof genre !== "string" ||
		typeof registrationDate !== "string" ||
		typeof isTest !== "boolean" ||
		sheets.some((sheet) => sheet === null)
	) {
		return null;
	}

	return {
		id,
		title,
		artist,
		bpm,
		genre,
		registrationDate,
		isTest,
		sheets: sheets as SyncedSheet[],
	};
}

export function parseMusicCatalog(value: unknown): SyncedMusic[] | null {
	if (!Array.isArray(value)) {
		return null;
	}

	const catalog = value.map(parseMusic);
	return catalog.every((music) => music !== null)
		? (catalog as SyncedMusic[])
		: null;
}
