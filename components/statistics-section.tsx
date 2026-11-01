import type { GlobalStatistics } from "@/lib/statistics";
import styles from "./statistics-section.module.css";

export default function StatisticsSection({
	statistics,
}: {
	statistics: GlobalStatistics;
}) {
	return (
		<section
			className={`${styles.statistics} flex items-center justify-around gap-[10px]`}
			aria-label="XLAIRのプレイ統計"
		>
			<div className="flex min-w-0 flex-1 flex-col items-center gap-[5px]">
				<span className={styles.label}>総プレイ数</span>
				<strong>
					{statistics.totalCredits}
					<small className={styles.unit}>回</small>
				</strong>
			</div>
			<div className="flex min-w-0 flex-1 flex-col items-center gap-[5px]">
				<span className={styles.label}>総ユーザー数</span>
				<strong>
					{statistics.totalUsers}
					<small className={styles.unit}>人</small>
				</strong>
			</div>
			<div className="flex min-w-0 flex-1 flex-col items-center gap-[5px]">
				<span className={styles.label}>総スコア</span>
				<strong>{Math.floor(statistics.totalScore / 1000)}k</strong>
			</div>
		</section>
	);
}
