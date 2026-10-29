import Image from "next/image";
import { Suspense } from "react";
import { CategorySelector } from "@/components/category-selector";
import Heading from "@/components/heading";
import PageShell from "@/components/page-shell";
import RankingDistributionChart from "@/components/ranking-distribution-chart";
import { fetchApi } from "@/lib/api";
import {
	getRankingCategories,
	type RankingCategoryOption,
	type RankingDisplayEntry,
	type RankingDistributionBin,
	toDisplayEntries,
	toDistributionBins,
} from "@/lib/rankings";

export const dynamic = "force-dynamic";

type RankingSearchParams = Record<string, string | string[] | undefined>;

interface RankingsPageProps {
	searchParams?: RankingSearchParams | Promise<RankingSearchParams>;
}

interface FetchResult {
	entries: RankingDisplayEntry[];
	distribution: RankingDistributionBin[];
	error: string | null;
}

const ORDINAL_SUFFIX_MAP: Record<number, string> = {
	1: "st",
	2: "nd",
	3: "rd",
};

function getOrdinalSuffix(rank: number): string {
	const remainder = rank % 100;
	if (remainder >= 11 && remainder <= 13) return "th";
	return ORDINAL_SUFFIX_MAP[rank % 10] ?? "th";
}

async function fetchRankingEntries(
	category: RankingCategoryOption,
): Promise<FetchResult> {
	try {
		const response = await fetchApi(category.endpoint);
		if (!response) {
			return {
				entries: [],
				distribution: [],
				error: "API の接続設定がされていません。",
			};
		}
		if (!response.ok) {
			console.error(
				`Failed to fetch rankings (${category.id}): ${response.status} ${response.statusText}`,
			);
			return {
				entries: [],
				distribution: [],
				error: "ランキングを取得できませんでした。",
			};
		}
		const data: unknown = await response.json();
		return {
			entries: toDisplayEntries(data, category.valueKey),
			distribution: toDistributionBins(data),
			error: null,
		};
	} catch (error) {
		console.error(`Error fetching rankings (${category.id}):`, error);
		return {
			entries: [],
			distribution: [],
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
	if (error)
		return (
			<p className="ranking-message" role="alert">
				{error}
			</p>
		);
	if (entries.length === 0)
		return <p className="ranking-message">ランキング情報がありません。</p>;

	return (
		<section
			className="ranking-results"
			aria-label={`${selectedCategory.label}ランキング`}
		>
			<div className="ranking-results__labels" aria-hidden="true">
				<span>NAME</span>
				<span>{selectedCategory.valueLabel.toUpperCase()}</span>
			</div>
			<ol className="ranking-list">
				{entries.map((entry) => (
					<li
						key={`${selectedCategory.id}-${entry.rank}-${entry.displayName}`}
						className="ranking-row"
					>
						<div
							className={`ranking-row__rank ranking-row__rank--${entry.rank <= 3 ? entry.rank : "regular"}`}
						>
							{entry.rank <= 3 && (
								<Image
									src={`/icon_${entry.rank === 1 ? "1st" : entry.rank === 2 ? "2nd" : "3rd"}.svg`}
									alt=""
									width={58}
									height={58}
									aria-hidden="true"
								/>
							)}
							<span className="ranking-row__rank-label">
								<strong className="ranking-row__number">{entry.rank}</strong>
								<small className="ranking-row__suffix">
									{getOrdinalSuffix(entry.rank)}
								</small>
							</span>
						</div>
						<p className="ranking-row__name">{entry.displayName}</p>
						<p className="ranking-row__value">
							{new Intl.NumberFormat("ja-JP").format(entry.value)}
						</p>
					</li>
				))}
			</ol>
		</section>
	);
}

export default async function RankingsPage(props: RankingsPageProps) {
	const rankingCategories = await getRankingCategories();
	const searchParams = await props.searchParams;
	const categoryParam = searchParams?.category;
	const categoryId =
		typeof categoryParam === "string" ? categoryParam : rankingCategories[0].id;
	const selectedCategory =
		rankingCategories.find((category) => category.id === categoryId) ??
		rankingCategories[0];
	const { entries, distribution, error } =
		await fetchRankingEntries(selectedCategory);

	return (
		<PageShell>
			<main className="rankings-page">
				<Heading as="h1">RANKING</Heading>
				<p className="rankings-page__description">
					雙峰祭期間中のプレイヤーのレートやXP、各楽曲のハイスコアを確認できます。
					<br className="desktop-break" />
					ベストスコアを更新して、総合ランキングの頂点を目指しましょう。
				</p>
				<Suspense fallback={<div className="ranking-selector-placeholder" />}>
					<CategorySelector categories={rankingCategories} />
				</Suspense>
				<div className="ranking-chart-frame">
					<RankingDistributionChart
						bins={distribution}
						label={selectedCategory.valueLabel}
					/>
				</div>
				<RankingList
					entries={entries}
					selectedCategory={selectedCategory}
					error={error}
				/>
			</main>
		</PageShell>
	);
}
