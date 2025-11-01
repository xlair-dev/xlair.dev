import type { Metadata } from "next";
import { Jost, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-noto-sans-jp",
	display: "swap",
});

const jost = Jost({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-jost",
	display: "swap",
});

const siteUrl = process.env.SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: "音ゲー「XLAIR」公式 Webサイト",
	description:
		"新作音ゲーム「XLAIR」を、筑波大学 雙峰祭2025 にて展示します。XLAIR は、画面に表示されるノーツに合わせてスライダーをなぞったりボタンを押したりすることで楽曲を演奏する、リズムアクション型の音楽ゲームです。当日はぜひ 2D304 にお越しください！",
	openGraph: {
		title: "音ゲー「XLAIR」公式 Webサイト",
		url: siteUrl,
		images: [
			{
				url: "/og.png",
				width: 1200,
				height: 630,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		images: ["/og.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" className={`${notoSansJP.variable} ${jost.variable}`}>
			<body className={notoSansJP.className}>{children}</body>
		</html>
	);
}
