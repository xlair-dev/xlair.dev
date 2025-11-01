"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useMemo } from "react";
import type { RankingCategoryOption } from "@/lib/rankings";

/**
 * Category selector dropdown for rankings page.
 * Synchronizes selected category with URL query parameters.
 */
export function CategorySelector({
	categories,
}: {
	categories: RankingCategoryOption[];
}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const detailsRef = useRef<HTMLDetailsElement>(null);

	// Get selected category from URL query parameter
	const selectedCategory = useMemo(() => {
		const categoryParam = searchParams.get("category");
		const categoryId = categoryParam || categories[0].id;
		return (
			categories.find((category) => category.id === categoryId) ?? categories[0]
		);
	}, [searchParams, categories]);

	// Close details when category changes
	useEffect(() => {
		if (detailsRef.current) {
			detailsRef.current.open = false;
		}
	}, [searchParams]);

	const handleCategoryChange = (categoryId: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("category", categoryId);
		router.replace(`/rankings?${params.toString()}`);
	};

	return (
		<div className="relative">
			<details ref={detailsRef} className="relative group">
				<summary
					className="bg-brand-sub text-white text-sm sm:text-base md:text-lg font-medium px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 rounded-full shadow-md hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2"
					style={{ listStyle: "none" }}
				>
					<span>{selectedCategory.label}</span>
					<span aria-hidden="true" className="text-white text-xs sm:text-sm">
						▼
					</span>
				</summary>
				<div className="absolute left-1/2 top-full mt-2 w-[260px] sm:w-[320px] -translate-x-1/2 bg-white border border-brand-sub/40 rounded-3xl shadow-lg py-2 z-10">
					{categories.map((category) => (
						<button
							key={category.id}
							type="button"
							onClick={() => handleCategoryChange(category.id)}
							className={`w-full text-sm sm:text-base text-gray-700 px-4 py-3 transition-colors text-left rounded-3xl ${
								category.id === selectedCategory.id
									? "bg-brand-sub/15 font-semibold"
									: "hover:bg-brand-sub/10"
							}`}
						>
							{category.label}
						</button>
					))}
				</div>
			</details>
		</div>
	);
}

