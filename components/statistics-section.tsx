import type { GlobalStatistics } from "@/lib/statistics";

export default function StatisticsSection({
	statistics,
}: {
	statistics: GlobalStatistics;
}) {
	return (
		<section className="hero-statistics" aria-label="XLAIRのプレイ統計">
			<div>
				<span className="hero-statistics__label">総プレイ数</span>
				<strong>
					{statistics.totalCredits}
					<small>回</small>
				</strong>
			</div>
			<div>
				<span className="hero-statistics__label">総ユーザー数</span>
				<strong>
					{statistics.totalUsers}
					<small>人</small>
				</strong>
			</div>
			<div>
				<span className="hero-statistics__label">総スコア</span>
				<strong>{Math.floor(statistics.totalScore / 1000)}k</strong>
			</div>
		</section>
	);
}
