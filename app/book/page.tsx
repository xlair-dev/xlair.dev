import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BrandBlurBackground from "@/components/brand-blur-background";
import Footer from "@/components/footer";
import Heading from "@/components/heading";
import ObiStrip from "@/components/obi-strip";

export const metadata: Metadata = {
	title: "同人誌プレビュー",
	description: "XLAIRの同人誌のプレビューをご覧いただけます。",
	alternates: { canonical: "/book" },
};

const pages = [
	{ src: "01", width: 1266, label: "目次" },
	{ src: "02", width: 1275, label: "XLAIRの遊び方" },
	{ src: "03a", width: 1266, label: "開発について 1" },
	{ src: "03b", width: 1287, label: "開発について 2" },
	{ src: "04", width: 1275, label: "サウンドについて" },
	{ src: "05", width: 1287, label: "デザインについて" },
] as const;

export default function BookPreview() {
	return (
		<BrandBlurBackground offset="50vh">
			<ObiStrip height={{ base: "160px", sm: "200px", lg: "240px" }} />
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
				<div className="flex flex-col items-center gap-4 sm:gap-6 text-center">
					<h1>
						<Heading className="justify-center">BOOK</Heading>
					</h1>
					<p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed my-6 sm:my-12 md:my-16">
						XLAIRの同人誌の中身を、少しだけご紹介します。
						<br />
						画像を選ぶと大きく表示できます。
					</p>
				</div>
				<nav
					aria-label="プレビューの目次"
					className="flex flex-wrap justify-center gap-2 sm:gap-4 w-full max-w-4xl"
				>
					{pages.map((page) => (
						<a
							key={page.src}
							href={`#page-${page.src}`}
							className="rounded-full border border-brand-main bg-white px-4 sm:px-6 py-2 text-sm sm:text-base text-brand-main hover:text-white hover:bg-brand-main transition-colors duration-300"
						>
							{page.label}
						</a>
					))}
				</nav>
				<section
					aria-label="プレビュー一覧"
					className="flex flex-col items-center gap-16 sm:gap-24 w-full max-w-4xl mt-10 sm:mt-16"
				>
					{pages.map((page) => (
						<article
							key={page.src}
							id={`page-${page.src}`}
							className="scroll-mt-8 w-full"
						>
							<div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
								<h2 className="text-brand-main text-xl sm:text-2xl md:text-3xl font-medium">
									{page.label}
								</h2>
								<a
									href={`/book-preview/${page.src}.png`}
									target="_blank"
									rel="noreferrer"
									className="shrink-0 text-sm sm:text-base text-brand-main hover:underline"
								>
									画像を拡大
								</a>
							</div>
							<div className="h-px bg-brand-sub mb-4 sm:mb-6" />
							<a
								href={`/book-preview/${page.src}.png`}
								target="_blank"
								rel="noreferrer"
								aria-label={`${page.label}の画像を新しいタブで開く`}
								className="block border border-gray-200 bg-white"
							>
								<Image
									src={`/book-preview/${page.src}.png`}
									alt={`${page.label}のプレビュー`}
									width={page.width}
									height={1800}
									className="h-auto w-full"
									sizes="(max-width: 896px) 100vw, 896px"
								/>
							</a>
						</article>
					))}
				</section>
			</main>
			<Footer />
		</BrandBlurBackground>
	);
}
