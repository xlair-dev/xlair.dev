import { Suspense } from "react";
import { CategorySelector } from "@/components/category-selector";
import Heading from "@/components/heading";
import PageShell from "@/components/page-shell";
import RankingDistributionChart from "@/components/ranking-distribution-chart";
import RankingList from "@/components/rankings/ranking-list";
import { fetchApi } from "@/lib/api";
import {
	getRankingCategories,
	type RankingCategoryOption,
	type RankingDisplayEntry,
	type RankingDistributionBin,
	toDisplayEntries,
	toDistributionBins,
} from "@/lib/rankings";
import styles from "./rankings.module.css";

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
			<main className={styles.page}>
				<Heading as="h1" className={styles.heading}>
					RANKING
				</Heading>
				<p className={styles.description}>
					雙峰祭期間中のプレイヤーのレートやXP、各楽曲のハイスコアを確認できます。
					<br className="desktop-break" />
					ベストスコアを更新して、総合ランキングの頂点を目指しましょう。
				</p>
				<Suspense fallback={<div className={styles.selectorPlaceholder} />}>
					<CategorySelector categories={rankingCategories} />
				</Suspense>
				<div className={styles.chartFrame}>
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
