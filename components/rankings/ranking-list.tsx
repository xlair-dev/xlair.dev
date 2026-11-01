import Image from "next/image";
import type {
	RankingCategoryOption,
	RankingDisplayEntry,
} from "@/lib/rankings";
import styles from "./ranking-list.module.css";

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

const formatValue = new Intl.NumberFormat("ja-JP");

export default function RankingList({
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
			<p className={styles.message} role="alert">
				{error}
			</p>
		);
	if (entries.length === 0)
		return <p className={styles.message}>ランキング情報がありません。</p>;

	return (
		<section
			className={styles.results}
			aria-label={`${selectedCategory.label}ランキング`}
		>
			<div className={styles.labels} aria-hidden="true">
				<span>NAME</span>
				<span>{selectedCategory.valueLabel.toUpperCase()}</span>
			</div>
			<ol className={styles.podium}>
				{entries.map(
					(entry) =>
						entry.rank <= 3 && (
							<li
								key={`${selectedCategory.id}-${entry.rank}-${entry.displayName}`}
								className={styles.podiumRow}
							>
								<div
									className={`${styles.rank} ${styles[`rank${entry.rank}`]}`}
								>
									<Image
										src={`/icon_${entry.rank === 1 ? "1st" : entry.rank === 2 ? "2nd" : "3rd"}.svg`}
										alt=""
										width={139}
										height={147}
										aria-hidden="true"
									/>
									<span className={styles.rankLabel}>
										<strong className={styles.rankNumber}>{entry.rank}</strong>
										<small className={styles.rankSuffix}>
											{getOrdinalSuffix(entry.rank)}
										</small>
									</span>
								</div>
								<p className={styles.name}>{entry.displayName}</p>
								<p className={styles.value}>
									{formatValue.format(entry.value)}
								</p>
							</li>
						),
				)}
			</ol>
			<ol className={styles.regular} start={4}>
				{entries.map(
					(entry) =>
						entry.rank > 3 && (
							<li
								key={`${selectedCategory.id}-${entry.rank}-${entry.displayName}`}
								className={styles.regularRow}
							>
								<span className={styles.regularRank}>
									<strong>{entry.rank}</strong>
									<small>{getOrdinalSuffix(entry.rank)}</small>
								</span>
								<p className={styles.name}>{entry.displayName}</p>
								<p className={styles.value}>
									{formatValue.format(entry.value)}
								</p>
							</li>
						),
				)}
			</ol>
		</section>
	);
}
