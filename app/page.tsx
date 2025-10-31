import NavigationArrow from "@/components/navigation-arrow";
import Image from "next/image";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<p className="text-brand-main text-xl mb-4">
				ー リズム型アクションゲーム ー
			</p>
			<Image
				src="/logo.svg"
				alt="xlair"
				width={800}
				height={400}
				className="w-[80vw] h-auto max-w-[1080px]"
				priority
			/>
			<div className="text-brand-main text-5xl font-medium mt-4 flex flex-row items-center gap-4">
				<div className="flex flex-row items-center">
					<p>11.02</p>
					<NavigationArrow size={24} className="text-brand-main-light" />
					<p>11.03</p>
				</div>
				<div className="flex flex-row items-end">
					<p>雙峰祭</p>
					<p className="text-4xl">にて</p>
					<p>公開中</p>
				</div>
			</div>
		</main>
	);
}
