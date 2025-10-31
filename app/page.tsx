import NavigationArrow from "@/components/navigation-arrow";
import Image from "next/image";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center px-4">
			<p className="text-brand-main text-sm sm:text-base md:text-lg lg:text-xl	 text-center">
				ー リズム型アクションゲーム ー
			</p>
			<Image
				src="/logo.svg"
				alt="xlair"
				width={800}
				height={400}
				className="w-[90vw] sm:w-[80vw] h-auto max-w-[1080px]"
				priority
			/>
			<div className="text-brand-main font-medium mt-4 sm:mt-6 flex flex-col sm:flex-row items-center gap-0 sm:gap-2 md:gap-3">
				<div className="flex flex-row items-center text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
					<p>11.02</p>
					<NavigationArrow className="text-brand-main-light w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
					<p>11.03</p>
				</div>
				<div className="flex flex-row items-end text-base sm:text-xl md:text-2xl lg:text-3xl">
					<p>雙峰祭</p>
					<p className="text-sm sm:text-lg md:text-xl lg:text-2xl">にて</p>
					<p>公開中</p>
				</div>
			</div>
		</main>
	);
}
