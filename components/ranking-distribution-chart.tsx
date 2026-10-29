"use client";

import {
	ChartsContainer,
	ChartsGrid,
	ChartsXAxis,
	ChartsYAxis,
	LinePlot,
} from "@mui/x-charts";
import type { RankingDistributionBin } from "@/lib/rankings";

const formatValue = new Intl.NumberFormat("ja-JP");

function rangeLabel({ rangeStart, rangeEnd }: RankingDistributionBin) {
	return rangeStart === rangeEnd
		? formatValue.format(rangeStart)
		: `${formatValue.format(rangeStart)}–${formatValue.format(rangeEnd)}`;
}

export default function RankingDistributionChart({
	bins,
	label,
}: {
	bins: RankingDistributionBin[];
	label: string;
}) {
	return (
		<figure className="distribution-chart" aria-labelledby="distribution-title">
			<figcaption id="distribution-title">{label}の分布</figcaption>
			{bins.length === 0 ? (
				<p className="distribution-chart__empty" role="status">
					分布データはありません。
				</p>
			) : (
				<ChartsContainer
					aria-label={`${label}の公開プレイヤー分布`}
					className="distribution-chart__canvas"
					margin={{ top: 14, right: 42, bottom: 34, left: 42 }}
					xAxis={[
						{
							scaleType: "band",
							data: bins.map(rangeLabel),
							label: label,
							tickLabelInterval: "auto",
							tickLabelMinGap: 8,
							tickLabelStyle: { fontSize: 10 },
						},
					]}
					yAxis={[{ label: "プレイヤー数", min: 0, width: 42 }]}
					series={[
						{
							id: "players",
							label: "プレイヤー数",
							data: bins.map((bin) => bin.playerCount),
							type: "line",
							area: true,
							curve: "monotoneX",
							showMark: false,
							valueFormatter: (value) => `${formatValue.format(value ?? 0)}人`,
							color: "#3bb4ea",
						},
					]}
					skipAnimation
					sx={{
						width: "100%",
						"& .MuiChartsAxis-tickLabel": { fill: "#365f72" },
						"& .MuiChartsAxis-label": { fill: "#718393", fontSize: 10 },
						"& .MuiChartsGrid-line": { stroke: "#e6f0f5" },
					}}
				>
					<ChartsGrid horizontal />
					<LinePlot />
					<ChartsXAxis />
					<ChartsYAxis />
				</ChartsContainer>
			)}
			{bins.length > 0 && (
				<table className="sr-only">
					<caption>{label}のプレイヤー分布</caption>
					<thead>
						<tr>
							<th scope="col">{label}の範囲</th>
							<th scope="col">プレイヤー数</th>
						</tr>
					</thead>
					<tbody>
						{bins.map((bin) => (
							<tr key={`${bin.rangeStart}-${bin.rangeEnd}`}>
								<th scope="row">{rangeLabel(bin)}</th>
								<td>{formatValue.format(bin.playerCount)}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</figure>
	);
}
