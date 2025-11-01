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

export const metadata: Metadata = {
	title: "xlair.dev",
	icons: {
		icon: "/favicon.svg",
	},
	openGraph: {
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
