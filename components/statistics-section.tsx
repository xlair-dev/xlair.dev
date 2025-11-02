/**
 * Statistics section component that displays global game statistics.
 * Fetches data from the API server-side.
 */

interface GlobalStatistics {
	totalCredits: number;
	totalUsers: number;
	totalScore: number;
}

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
			<p className="text-brand-main text-sm sm:text-lg md:text-xl lg:text-2xl font-medium">
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
	return (
		<div className="flex flex-col items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 my-8 sm:my-12 md:my-16 lg:my-20">
			<p className="text-brand-main text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium">
				雙峰祭にて公開中！
			</p>
			<div className="brand-border rounded-4xl sm:rounded-full w-[75vw] sm:w-[90vw] max-w-lg sm:max-w-xl md:max-w-4xl lg:max-w-5xl flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 px-12 sm:px-12 md:px-16 lg:px-20 py-8 sm:py-12 md:py-16 lg:py-20">
				<StatisticsItem
					label="総プレイ数"
					// TODO: 以下を statistics.totalCredits に修正
					value={statistics.totalUsers * 2}
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
	);
}
