import BrandBlurBackground from "@/components/brand-blur-background";
import Heading from "@/components/heading";
import NavigationArrow from "@/components/navigation-arrow";
import ObiStrip from "@/components/obi-strip";
import Image from "next/image";

export default function Home() {
	return (
		<BrandBlurBackground offset="95vh">
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
			<div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12 lg:gap-14 my-16 sm:my-20 md:my-24 lg:my-28">
				<Heading>ABOUT</Heading>
				<div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12 lg:gap-14 text-center">
					<div className="flex items-end gap-1 sm:gap-3 md:gap-4">
						<Image
							src="/logo.svg"
							alt="XLAIR"
							width={200}
							height={100}
							className="w-40 sm:w-72 md:w-80 lg:w-96 h-auto"
						/>
						<p className="text-brand-main text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium">
							とは
						</p>
					</div>
					<p className="text-gray-600 text-xs sm:text-lg md:text-xl lg:text-2xl leading-normal">
						画面に流れるノーツに合わせて、
						<br />
						スライダーをなぞったりボタンを押したりして
						<br />
						楽曲を演奏するオリジナルリズム型アクションゲームです。
					</p>
					<p className="text-gray-600 text-xs sm:text-lg md:text-xl lg:text-2xl leading-normal">
						実際の筐体を使って操作し、
						<br />
						音楽に合わせて手を動かす楽しさをぜひ体験してください。
					</p>
				</div>
			</div>
			<div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12 lg:gap-14 my-16 sm:my-20 md:my-24 lg:my-28">
				<Heading>INFO</Heading>
				<div className="border border-brand-main w-[90vw] max-w-lg sm:max-w-xl md:max-w-4xl flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 px-12 sm:px-16 md:px-20 lg:px-24 py-16 sm:py-20 md:py-24 lg:py-28">
					<div className="flex flex-row items-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-600 font-medium">
						<p>11.02</p>
						<NavigationArrow className="text-brand-main-light w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 translate-y-1" />
						<p>11.03</p>
					</div>
					<p className="text-gray-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
						筑波大学 2D304 教室
					</p>
					<p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal">
						<span className="text-gray-600">1PLAY</span>{" "}
						<span className="text-brand-main">¥100</span>
					</p>
				</div>
			</div>
		</BrandBlurBackground>
	);
}
