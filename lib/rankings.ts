/**
 * Sheet ID for the song "AXCEL³".
 * Retrieved from environment variable TMP_AXCEL3_SHEET_ID.
 */
export const SHEET_AXCEL3_ID = process.env.TMP_AXCEL3_SHEET_ID;

/**
 * Sheet ID for the song "Everything".
 * Retrieved from environment variable TMP_EVERYTHING_SHEET_ID.
 */
export const SHEET_EVERYTHING_ID = process.env.TMP_EVERYTHING_SHEET_ID;

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

export const rankingCategories: RankingCategoryOption[] = [
	{
		id: "total-score",
		label: "総計ハイスコア",
		endpoint: "/rankings/total-score",
		valueKey: "totalScore",
		valueLabel: "総計ハイスコア",
	},
	{
		id: "sheet-axcel3",
		label: "「AXCEL³」MASTER のハイスコア",
		endpoint: `/rankings/sheets/${SHEET_AXCEL3_ID}`,
		valueKey: "score",
		valueLabel: "ハイスコア",
	},
	{
		id: "sheet-everything",
		label: "「Everything」MASTER のハイスコア",
		endpoint: `/rankings/sheets/${SHEET_EVERYTHING_ID}`,
		valueKey: "score",
		valueLabel: "ハイスコア",
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
 * Converts API responses into ranking entries used by the UI.
 * @param data - Raw API response
 * @param valueKey - Key used to extract the ranking metric
 * @returns Sanitized ranking entries (maximum 20 items)
 */
export function toDisplayEntries(
	data: unknown,
	valueKey: RankingValueKey,
): RankingDisplayEntry[] {
	if (!data || typeof data !== "object" || data === null) {
		return [];
	}

	if (!("entries" in data)) {
		return [];
	}

	const rawEntries = Array.isArray((data as { entries: unknown }).entries)
		? (data as { entries: unknown[] }).entries.slice(0, 20)
		: [];

	return rawEntries.flatMap((item) => {
		if (!item || typeof item !== "object") {
			return [];
		}

		const entry = item as Record<string, unknown>;
		const rank = entry.rank;
		const displayName = entry.displayName;
		const value = entry[valueKey];

		if (
			typeof rank !== "number" ||
			typeof displayName !== "string" ||
			typeof value !== "number"
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
	});
}
