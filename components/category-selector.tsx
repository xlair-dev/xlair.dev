"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { RankingCategoryOption } from "@/lib/rankings";

const aggregateLabels: Record<string, string> = {
	"total-score": "総計スコア",
	rating: "レート",
	xp: "XP",
};

export function CategorySelector({
	categories,
}: {
	categories: RankingCategoryOption[];
}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const selectedCategory = useMemo(() => {
		const id = searchParams.get("category") || categories[0]?.id;
		return categories.find((category) => category.id === id) ?? categories[0];
	}, [searchParams, categories]);
	const sheetCategories = categories.filter((category) =>
		category.id.startsWith("sheet-"),
	);
	const selectedIsSheet = selectedCategory?.id.startsWith("sheet-") ?? false;

	const selectCategory = (id: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("category", id);
		router.replace(`/rankings?${params.toString()}`, { scroll: false });
	};

	return (
		<section className="ranking-selector" aria-label="ランキングの種類">
			<div className="ranking-selector__tabs">
				{categories
					.filter((category) => category.id in aggregateLabels)
					.map((category) => (
						<button
							key={category.id}
							type="button"
							aria-pressed={selectedCategory?.id === category.id}
							className={
								selectedCategory?.id === category.id ? "is-selected" : ""
							}
							onClick={() => selectCategory(category.id)}
						>
							{aggregateLabels[category.id]}
						</button>
					))}
				<button
					type="button"
					disabled={sheetCategories.length === 0}
					aria-pressed={selectedIsSheet}
					className={selectedIsSheet ? "is-selected" : ""}
					onClick={() =>
						sheetCategories[0] && selectCategory(sheetCategories[0].id)
					}
				>
					曲別スコア
				</button>
			</div>
			{selectedIsSheet && (
				<label className="ranking-selector__song">
					<span>楽曲</span>
					<select
						value={selectedCategory.id}
						onChange={(event) => selectCategory(event.target.value)}
					>
						{sheetCategories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.label}
							</option>
						))}
					</select>
				</label>
			)}
		</section>
	);
}
