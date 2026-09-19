import type { Metadata } from "next";
import { Jost, Noto_Sans_JP } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { eventDescription, eventInformation } from "@/lib/event";
import "./globals.css";

config.autoAddCss = false;

const notoSansJP = Noto_Sans_JP({
	subsets: ["latin"],
	weight: ["200", "300", "400", "500", "700"],
	variable: "--font-noto-sans-jp",
	display: "swap",
});

const jost = Jost({
	subsets: ["latin"],
	weight: ["200", "300", "400", "500", "700"],
	variable: "--font-jost",
	display: "swap",
});

const siteUrl = process.env.SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "音ゲー「XLAIR」公式 Webサイト",
		template: "%s | XLAIR",
	},
	description: eventDescription,
	keywords: [
		"XLAIR",
		"音ゲー",
		"リズムゲーム",
		"音楽ゲーム",
		"筑波大学",
		"雙峰祭",
		`${eventInformation.name}${eventInformation.year}`,
		"リズムアクション",
		"音ゲーム",
		"ゲーム",
		"筑波",
		"学祭",
	],
	authors: [{ name: "XLAIR Project" }],
	creator: "XLAIR Project",
	publisher: "XLAIR Project",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	alternates: {
		canonical: siteUrl,
	},
	openGraph: {
		type: "website",
		locale: "ja_JP",
		url: siteUrl,
		siteName: "XLAIR",
		title: "音ゲー「XLAIR」公式 Webサイト",
		description: eventDescription,
		images: [
			{
				url: "/og.png",
				width: 1200,
				height: 630,
				alt: "XLAIR 公式 Webサイト",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "音ゲー「XLAIR」公式 Webサイト",
		description: eventDescription,
		images: ["/og.png"],
	},
	formatDetection: {
		telephone: false,
		date: false,
		address: false,
		email: false,
		url: false,
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
