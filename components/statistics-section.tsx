import { eventInformation, eventPhaseText, getEventPhase } from "@/lib/event";
import type { GlobalStatistics } from "@/lib/statistics";

/**
 * Formats a large number with 'k' suffix (divided by 1000).
 * @param value - The number to format
 * @returns Formatted string (e.g., "1234k")
 */
function formatScore(value: number): string {
	return `${Math.floor(value / 1000)}k`;
}

interface StatisticsItemProps {
	label: string;
	value: string | number;
	unit: string;
}

/**
 * Individual statistics item component.
 */
function StatisticsItem({ label, value, unit }: StatisticsItemProps) {
	return (
		<div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4">
			<p className="text-brand-main text-sm sm:text-lg md:text-xl lg:text-2xl font-medium whitespace-nowrap">
				{label}
			</p>
			<div className="flex items-baseline gap-1 sm:gap-2">
				<p className="text-gray-600 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium">
					{value}
				</p>
				<p className="text-brand-main text-sm sm:text-lg md:text-xl lg:text-2xl font-medium">
					{unit}
				</p>
			</div>
		</div>
	);
}

interface StatisticsSectionProps {
	statistics: GlobalStatistics;
}

/**
 * Statistics section component displaying total credits, users, and score.
 */
export default function StatisticsSection({
	statistics,
}: StatisticsSectionProps) {
	const eventPhase = getEventPhase();
	return (
		<div className="flex flex-col items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 my-8 sm:my-12 md:my-16 lg:my-20">
			<p className="text-brand-main text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium">
				{eventInformation.name}
				{eventPhaseText[eventPhase].statistics}
			</p>
			<div className="brand-border rounded-4xl sm:rounded-full w-[calc(90vw+24px)] max-w-xl sm:max-w-2xl md:max-w-5xl lg:max-w-6xl flex flex-col items-center justify-center gap-2 sm:gap-6 md:gap-8 lg:gap-10 px-12 sm:px-12 md:px-16 lg:px-20 pt-2 sm:pt-6 md:pt-10 lg:pt-14 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
				<p className="text-brand-main text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium">
					2025年・2026年 総計
				</p>
				<div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20">
					<StatisticsItem
						label="総プレイ数"
						value={statistics.totalCredits}
						unit="回"
					/>
					<StatisticsItem
						label="総ユーザー数"
						value={statistics.totalUsers}
						unit="人"
					/>
					<StatisticsItem
						label="総ハイスコア"
						value={formatScore(statistics.totalScore)}
						unit=""
					/>
				</div>
			</div>
		</div>
	);
}
