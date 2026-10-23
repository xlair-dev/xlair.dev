import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import BrandBlurBackground from "@/components/brand-blur-background";
import Footer from "@/components/footer";
import Heading from "@/components/heading";
import ObiStrip from "@/components/obi-strip";

export default function RankingsPage() {
	return (
		<BrandBlurBackground offset="50vh">
			<ObiStrip
				height={{
					base: "160px",
					sm: "200px",
					lg: "240px",
				}}
			/>
			<Link
				href="/"
				className="fixed top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border border-brand-main bg-white text-brand-main hover:text-white hover:bg-brand-main transition-colors duration-300 flex items-center justify-center z-50"
				aria-label="トップページに戻る"
			>
				<FontAwesomeIcon
					icon={faArrowLeft}
					className="text-base sm:text-lg md:text-xl lg:text-2xl"
				/>
			</Link>
			<main className="relative min-h-svh flex flex-col items-center gap-4 sm:gap-6 md:gap-8 px-4 pb-24 pt-32 sm:pt-40">
				<div className="flex flex-col items-center gap-8 sm:gap-10 text-center">
					<Heading className="justify-center">RANKING</Heading>
					<p className="text-gray-600 text-base sm:text-lg md:text-xl">
						計画停電に伴い、ランキングを一時停止しています。
					</p>
				</div>
			</main>
			<Footer />
		</BrandBlurBackground>
	);
}
