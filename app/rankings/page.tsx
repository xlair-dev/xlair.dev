import BrandBlurBackground from "@/components/brand-blur-background";
import { CategorySelector } from "@/components/category-selector";
import Footer from "@/components/footer";
import Heading from "@/components/heading";
import ObiStrip from "@/components/obi-strip";
import {
	type RankingCategoryOption,
	type RankingDisplayEntry,
	rankingCategories,
	toDisplayEntries,
} from "@/lib/rankings";
import Image from "next/image";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const DEFAULT_CATEGORY = rankingCategories[0];

type RankingSearchParams = Record<string, string | string[] | undefined>;

interface RankingsPageProps {
	searchParams?: RankingSearchParams | Promise<RankingSearchParams>;
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
					className="flex items-center gap-2 sm:gap-6 w-full"
				>
					<div className="w-16 sm:w-24 md:w-28 h-16 sm:h-24 md:h-28 flex justify-center items-center relative">
						{entry.rank === 1 && (
							<Image
								src="/icon_1st.svg"
								alt=""
								fill
								className="object-contain -translate-y-3"
								aria-hidden="true"
							/>
						)}
						{entry.rank === 2 && (
							<Image
								src="/icon_2nd.svg"
								alt=""
								fill
								className="object-contain -translate-y-3"
								aria-hidden="true"
							/>
						)}
						{entry.rank === 3 && (
							<Image
								src="/icon_3rd.svg"
								alt=""
								fill
								className="object-contain -translate-y-3"
								aria-hidden="true"
							/>
						)}
						<span
							className={`font-semibold relative z-10 flex items-baseline ${
								entry.rank === 1
									? "text-brand-sub"
									: entry.rank === 2
										? "text-brand-main"
										: "text-gray-600"
							}`}
						>
							<span className="text-3xl sm:text-5xl md:text-6xl">
								{entry.rank}
							</span>
							<span className="text-lg sm:text-2xl md:text-3xl">
								{formatOrdinal(entry.rank).replace(/\d+/, "")}
							</span>
						</span>
					</div>
					<div className="flex-1 rounded-3xl px-4 sm:px-6 md:px-10 py-4 sm:py-5">
						<p className="text-gray-600 text-lg sm:text-xl md:text-2xl font-medium text-center sm:text-left">
							{entry.displayName}
						</p>
						<div className="h-px bg-brand-sub my-3 sm:my-4" />
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-center sm:text-left">
							<span className="hidden sm:inline text-gray-600 text-base sm:text-lg">
								{selectedCategory.valueLabel}
							</span>
							<span className="text-gray-600 text-xl sm:text-2xl md:text-3xl font-semibold">
								{entry.value}
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default async function RankingsPage(props: RankingsPageProps) {
	const apiBaseUrl = process.env.API_BASE_URL;
	const searchParams = await props.searchParams;
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
					<Suspense fallback={<div className="h-16" />}>
						<CategorySelector categories={rankingCategories} />
					</Suspense>
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
