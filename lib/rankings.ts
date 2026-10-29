import type { SyncedMusic } from "@/lib/music";
import { getMusicCatalog } from "@/lib/sync";

export type RankingValueKey = "score" | "totalScore" | "rating" | "xp";

export interface RankingCategoryOption {
	id: string;
	label: string;
	endpoint: string;
	valueKey: RankingValueKey;
	valueLabel: string;
}

/**
 * Display-ready ranking entry.
 */
export interface RankingDisplayEntry {
	rank: number;
	displayName: string;
	value: number;
}

export interface RankingDistributionBin {
	rangeStart: number;
	rangeEnd: number;
	playerCount: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function isPositiveInteger(value: unknown): value is number {
	return typeof value === "number" && Number.isInteger(value) && value > 0;
}

function isNonNegativeInteger(value: unknown): value is number {
	return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

function sheetRankingCategories(musicCatalog: readonly SyncedMusic[]) {
	return musicCatalog
		.filter((music) => !music.isTest)
		.flatMap((music) =>
			music.sheets
				.filter((sheet) => sheet.difficulty === "master")
				.map((sheet) => ({
					id: `sheet-${sheet.id}`,
					label: `「${music.title}」MASTER のハイスコア`,
					endpoint: `/rankings/sheets/${encodeURIComponent(sheet.id)}`,
					valueKey: "score" as const,
					valueLabel: "ハイスコア",
				})),
		);
}

const aggregateRankingCategories: RankingCategoryOption[] = [
	{
		id: "total-score",
		label: "総計ハイスコア",
		endpoint: "/rankings/total-score",
		valueKey: "totalScore",
		valueLabel: "総計ハイスコア",
	},
	{
		id: "rating",
		label: "レーティング",
		endpoint: "/rankings/rating",
		valueKey: "rating",
		valueLabel: "レーティング",
	},
	{
		id: "xp",
		label: "XP",
		endpoint: "/rankings/xp",
		valueKey: "xp",
		valueLabel: "XP",
	},
];

/**
 * Builds ranking categories, omitting song-level categories when the music catalog is unavailable.
 */
export async function getRankingCategories(): Promise<RankingCategoryOption[]> {
	try {
		const musicCatalog = await getMusicCatalog();
		return [
			aggregateRankingCategories[0],
			...sheetRankingCategories(musicCatalog),
			...aggregateRankingCategories.slice(1),
		];
	} catch (error) {
		console.error(
			"Failed to load music catalog for ranking categories:",
			error,
		);
		return [...aggregateRankingCategories];
	}
}

/**
 * Converts API responses into ranking entries used by the UI.
 * @param data - Raw API response
 * @param valueKey - Key used to extract the ranking metric
 * @returns Sanitized ranking entries (maximum 20 items)
 */
export function toDisplayEntries(
	data: unknown,
	valueKey: RankingValueKey,
): RankingDisplayEntry[] {
	if (!isRecord(data) || !Array.isArray(data.entries)) {
		return [];
	}

	return data.entries
		.flatMap((item) => {
			if (!isRecord(item)) {
				return [];
			}

			const { rank, displayName, [valueKey]: value } = item;

			if (
				!isPositiveInteger(rank) ||
				typeof displayName !== "string" ||
				!isNonNegativeInteger(value)
			) {
				return [];
			}

			return [
				{
					rank,
					displayName,
					value,
				},
			];
		})
		.slice(0, 20);
}

export function toDistributionBins(data: unknown): RankingDistributionBin[] {
	if (!isRecord(data) || !isRecord(data.distribution)) return [];
	const { bins } = data.distribution;
	if (!Array.isArray(bins) || bins.length > 20) return [];
	const parsed = bins.flatMap((item) => {
		if (!isRecord(item)) return [];
		const { rangeStart, rangeEnd, playerCount } = item;
		if (
			!isNonNegativeInteger(rangeStart) ||
			!isNonNegativeInteger(rangeEnd) ||
			!isNonNegativeInteger(playerCount) ||
			rangeStart > rangeEnd
		)
			return [];
		return [{ rangeStart, rangeEnd, playerCount }];
	});
	return parsed.length === bins.length ? parsed : [];
}
