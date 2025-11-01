import NavigationArrow from "@/components/navigation-arrow";
import ObiStrip from "@/components/obi-strip";
import Image from "next/image";

export default function Home() {
	return (
		<div className="brand-blur-background">
			<ObiStrip
				height={{
					base: "160px",
					sm: "240px",
					lg: "320px",
				}}
			/>
			<main className="relative min-h-screen flex flex-col items-center justify-center px-4">
				<div
					className="absolute -left-20 top-0 h-screen w-auto opacity-80"
					style={{
						maskImage: "linear-gradient(to bottom, transparent 0%, black 30%)",
						WebkitMaskImage:
							"linear-gradient(to bottom, transparent 0%, black 30%)",
					}}
				>
					<Image
						src="/effect.png"
						alt=""
						width={700}
						height={1000}
						className="h-screen w-auto"
						aria-hidden="true"
					/>
				</div>
				<p className="text-brand-main text-sm sm:text-base md:text-lg lg:text-xl text-center">
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
				<div className="text-brand-main font-medium mt-4 sm:mt-6 flex flex-col item-end sm:flex-row items-center gap-0 sm:gap-2 md:gap-3">
					<div className="flex flex-row items-center text-4xl sm:text-4xl md:text-4xl lg:text-5xl">
						<p>11.02</p>
						<NavigationArrow className="text-brand-main-light w-8 h-8 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 translate-y-1" />
						<p>11.03</p>
					</div>
					<div className="flex flex-row items-end text-xl sm:text-2xl md:text-3xl lg:text-4xl">
						<p>雙峰祭</p>
						<p className="text-xl sm:text-xl md:text-2l lg:text-3xl">にて</p>
						<p>公開中</p>
					</div>
				</div>
			</main>
		</div>
	);
}
