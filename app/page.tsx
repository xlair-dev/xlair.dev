import AboutSection from "@/components/home/about";
import HomeHero from "@/components/home/hero";
import InformationSection from "@/components/home/information";
import PageShell from "@/components/page-shell";
import { fetchApi } from "@/lib/api";
import { type GlobalStatistics, parseGlobalStatistics } from "@/lib/statistics";

export const revalidate = 60;

async function fetchStatistics(): Promise<GlobalStatistics | null> {
	try {
		const response = await fetchApi("/statistics/summary", 5);
		if (!response?.ok) return null;
		return parseGlobalStatistics(await response.json());
	} catch (error) {
		console.error("Error fetching statistics:", error);
		return null;
	}
}

export default async function Home() {
	const statistics = await fetchStatistics();
	return (
		<PageShell>
			<main>
				<HomeHero statistics={statistics} />
				<AboutSection />
				<InformationSection />
			</main>
		</PageShell>
	);
}
