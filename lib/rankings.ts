/**
 * Sheet ID for the song "AXCEL³".
 * Retrieved from environment variable TMP_AXCEL3_SHEET_ID.
 */
export const SHEET_AXCEL3_ID = process.env.TMP_AXCEL3_SHEET_ID?.trim();

/**
 * Sheet ID for the song "Everything".
 * Retrieved from environment variable TMP_EVERYTHING_SHEET_ID.
 */
export const SHEET_EVERYTHING_ID = process.env.TMP_EVERYTHING_SHEET_ID?.trim();

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

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function isPositiveInteger(value: unknown): value is number {
	return typeof value === "number" && Number.isInteger(value) && value > 0;
}

function isNonNegativeInteger(value: unknown): value is number {
	return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

const sheetRankingCategories = [
	{
		id: "sheet-axcel3",
		label: "「AXCEL³」MASTER のハイスコア",
		sheetId: SHEET_AXCEL3_ID,
	},
	{
		id: "sheet-everything",
		label: "「Everything」MASTER のハイスコア",
		sheetId: SHEET_EVERYTHING_ID,
	},
].flatMap(({ sheetId, ...category }) =>
	sheetId
		? [
				{
					...category,
					endpoint: `/rankings/sheets/${encodeURIComponent(sheetId)}`,
					valueKey: "score" as const,
					valueLabel: "ハイスコア",
				},
			]
		: [],
);

export const rankingCategories: RankingCategoryOption[] = [
	{
		id: "total-score",
		label: "総計ハイスコア",
		endpoint: "/rankings/total-score",
		valueKey: "totalScore",
		valueLabel: "総計ハイスコア",
	},
	...sheetRankingCategories,
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
