import BrandBlurBackground from "@/components/brand-blur-background";
import Footer from "@/components/footer";
import Heading from "@/components/heading";
import ObiStrip from "@/components/obi-strip";
import {
	type RankingCategoryOption,
	type RankingDisplayEntry,
	rankingCategories,
	toDisplayEntries,
} from "@/lib/rankings";

const DEFAULT_CATEGORY = rankingCategories[0];

interface RankingsPageProps {
	searchParams?: Record<string, string | string[] | undefined>;
}

interface FetchResult {
	entries: RankingDisplayEntry[];
	error: string | null;
}

const ORDINAL_SUFFIX_MAP: Record<number, string> = {
	1: "st",
	2: "nd",
	3: "rd",
};

/**
 * Formats rank numbers into ordinal strings (e.g., "1st", "2nd").
 * @param rank - Rank value
 * @returns Ordinal-formatted rank
 */
function formatOrdinal(rank: number): string {
	const remainder = rank % 100;
	if (remainder >= 11 && remainder <= 13) {
		return `${rank}th`;
	}

	const suffix = ORDINAL_SUFFIX_MAP[rank % 10] ?? "th";
	return `${rank}${suffix}`;
}

/**
 * Fetches ranking entries for the specified category.
 * @param category - Target ranking category
 * @param apiBaseUrl - Base URL of the API server
 * @returns Ranking entries and optional error message
 * @requires API_BASE_URL - Base URL of the API server
 */
async function fetchRankingEntries(
	category: RankingCategoryOption,
	apiBaseUrl?: string,
): Promise<FetchResult> {
	if (!apiBaseUrl) {
		console.warn("API_BASE_URL is not set. Rankings will not be displayed.");
		return { entries: [], error: "API の接続設定がされていません。" };
	}

	try {
		const response = await fetch(`${apiBaseUrl}${category.endpoint}`, {
			next: { revalidate: 10 },
		});

		if (!response.ok) {
			console.error(
				`Failed to fetch rankings (${category.id}): ${response.status} ${response.statusText}`,
			);
			return {
				entries: [],
				error: "ランキングを取得できませんでした。",
			};
		}

		const data = await response.json();
		return {
			entries: toDisplayEntries(data, category.valueKey),
			error: null,
		};
	} catch (error) {
		console.error(`Error fetching rankings (${category.id}):`, error);
		return {
			entries: [],
			error: "ランキングを取得できませんでした。",
		};
	}
}

function CategorySelector({
	categories,
	selectedCategory,
}: {
	categories: RankingCategoryOption[];
	selectedCategory: RankingCategoryOption;
}) {
	return (
		<form method="get" className="relative">
			<details className="relative group">
				<summary
					className="bg-brand-sub text-white text-sm sm:text-base md:text-lg font-medium px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 rounded-full shadow-md hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2"
					style={{ listStyle: "none" }}
				>
					<span>{selectedCategory.label}</span>
					<span aria-hidden="true" className="text-white text-xs sm:text-sm">
						▼
					</span>
				</summary>
				<div className="absolute left-1/2 top-full mt-2 w-[260px] sm:w-[320px] -translate-x-1/2 bg-white border border-brand-sub/40 rounded-3xl shadow-lg py-2 z-10">
					{categories.map((category) => (
						<button
							key={category.id}
							type="submit"
							name="category"
							value={category.id}
							className={`w-full text-sm sm:text-base text-gray-700 px-4 py-3 transition-colors text-left rounded-3xl ${
								category.id === selectedCategory.id
									? "bg-brand-sub/15 font-semibold"
									: "hover:bg-brand-sub/10"
							}`}
						>
							{category.label}
						</button>
					))}
				</div>
			</details>
		</form>
	);
}

function RankingList({
	entries,
	selectedCategory,
	error,
}: {
	entries: RankingDisplayEntry[];
	selectedCategory: RankingCategoryOption;
	error: string | null;
}) {
	if (error) {
		return (
			<p className="text-red-500 text-sm sm:text-base text-center">{error}</p>
		);
	}

	if (entries.length === 0) {
		return (
			<p className="text-gray-500 text-sm sm:text-base text-center">
				ランキング情報がありません。
			</p>
		);
	}

	return (
		<div className="flex flex-col items-center gap-4 sm:gap-6 w-full">
			{entries.map((entry) => (
				<div
					key={`${selectedCategory.id}-${entry.rank}-${entry.displayName}`}
					className="flex items-center gap-4 sm:gap-6 w-full"
				>
					<div className="w-16 sm:w-20 flex justify-center">
						<span className="text-brand-main text-xl sm:text-2xl md:text-3xl font-semibold">
							{formatOrdinal(entry.rank)}
						</span>
					</div>
					<div className="flex-1 border border-brand-sub/40 rounded-3xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-white/70 backdrop-blur">
						<p className="text-gray-800 text-base sm:text-lg md:text-xl font-medium text-center sm:text-left">
							{entry.displayName}
						</p>
						<div className="h-px bg-brand-sub my-3 sm:my-4" />
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-center sm:text-left">
							<span className="text-gray-600 text-sm sm:text-base">
								{selectedCategory.valueLabel}
							</span>
							<span className="text-brand-main text-lg sm:text-xl md:text-2xl font-semibold">
								{entry.value.toLocaleString("ja-JP")}
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default async function RankingsPage({
	searchParams,
}: RankingsPageProps) {
	const apiBaseUrl = process.env.API_BASE_URL;
	const categoryParam = searchParams?.category;
	const categoryId =
		typeof categoryParam === "string" ? categoryParam : DEFAULT_CATEGORY.id;
	const selectedCategory =
		rankingCategories.find((category) => category.id === categoryId) ??
		DEFAULT_CATEGORY;

	const { entries, error } = await fetchRankingEntries(
		selectedCategory,
		apiBaseUrl,
	);

	return (
		<BrandBlurBackground offset="50vh">
			<ObiStrip
				height={{
					base: "160px",
					sm: "200px",
					lg: "240px",
				}}
			/>
			<main className="relative min-h-svh flex flex-col items-center gap-8 sm:gap-10 md:gap-12 px-4 pb-24 pt-32 sm:pt-40">
				<div className="flex flex-col items-center gap-4 sm:gap-6 text-center">
					<Heading className="justify-center">RANKING</Heading>
					<p className="text-gray-600 text-xs sm:text-base md:text-lg leading-relaxed">
						雙峰祭期間中のプレイヤーのレートや
						XP、各楽曲のハイスコアを確認できます。
						<br />
						ベストスコアを更新して、総合ランキングの頂点を目指しましょう。
					</p>
				</div>
				<div className="flex flex-col items-center gap-10 sm:gap-12 w-full max-w-4xl">
					<CategorySelector
						categories={rankingCategories}
						selectedCategory={selectedCategory}
					/>
					<RankingList
						entries={entries}
						selectedCategory={selectedCategory}
						error={error}
					/>
				</div>
			</main>
			<Footer />
		</BrandBlurBackground>
	);
}
