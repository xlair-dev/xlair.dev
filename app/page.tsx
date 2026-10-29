import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/heading";
import NavigationArrow from "@/components/navigation-arrow";
import PageShell from "@/components/page-shell";
import { fetchApi } from "@/lib/api";
import { eventInformation } from "@/lib/event";
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

const gallery = [
	{ src: "/gallery/xlair-gameplay.png", alt: "XLAIRのゲーム画面" },
	{ src: "/gallery/xlair-tracks.png", alt: "XLAIRの収録楽曲" },
	{ src: "/gallery/sohosai-2025.png", alt: "2025年の雙峰祭で展示したXLAIR" },
] as const;

function HeroStatistics({
	statistics,
}: {
	statistics: GlobalStatistics | null;
}) {
	if (!statistics) return null;
	return (
		<section className="hero-statistics" aria-label="XLAIRのプレイ統計">
			<div>
				<span className="hero-statistics__label">総プレイ数</span>
				<strong>
					{statistics.totalCredits}
					<small className="hero-statistics__unit">回</small>
				</strong>
			</div>
			<div>
				<span className="hero-statistics__label">総ユーザー数</span>
				<strong>
					{statistics.totalUsers}
					<small className="hero-statistics__unit">人</small>
				</strong>
			</div>
			<div>
				<span className="hero-statistics__label">総スコア</span>
				<strong>{Math.floor(statistics.totalScore / 1000)}k</strong>
			</div>
		</section>
	);
}

export default async function Home() {
	const statistics = await fetchStatistics();
	return (
		<PageShell>
			<main>
				<section className="hero" aria-labelledby="hero-title">
					<div className="hero__decoration" aria-hidden="true" />
					<div className="hero__content">
						<p className="hero__eyebrow">ー リズムアクション型ゲーム ー</p>
						<h1 id="hero-title" className="hero__logo">
							<Image
								src="/logo.webp"
								alt="XLAIR"
								width={2397}
								height={451}
								loading="eager"
							/>
						</h1>
						<div className="hero__date">
							<span className="hero__year">{eventInformation.year}</span>
							<p>
								<span className="event-card__date-label">
									10.31<small>（土）</small>
								</span>
								<NavigationArrow aria-hidden="true" />
								<span className="event-card__date-label">
									11.01<small>（日）</small>
								</span>
							</p>
							<strong>筑波大学「雙峰祭」にて展示</strong>
						</div>
						<HeroStatistics statistics={statistics} />
					</div>
				</section>

				<section id="about" className="home-section about-section">
					<Heading>ABOUT</Heading>
					<div className="about-section__grid">
						<div className="video-frame">
							<iframe
								src="https://www.youtube-nocookie.com/embed/-ibQZIVq8Rw"
								title="XLAIR 企画 CM"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								referrerPolicy="strict-origin-when-cross-origin"
								allowFullScreen
								loading="lazy"
							/>
						</div>
						<div className="about-section__copy">
							<div className="about-section__brand">
								<Image src="/logo.webp" alt="XLAIR" width={2397} height={451} />
								<strong>とは</strong>
							</div>
							<p>
								XLAIR（エクレア）は、大学4年生のチームで作り上げたオリジナルリズムアクションゲームです。
							</p>
							<p>
								流れる楽曲に合わせて、画面に流れるノーツをスライダーやボタンの操作でリズミカルにタップし、楽曲を演奏します。
							</p>
							<p>
								雙峰祭2年目となる今年は、収録楽曲がさらに増加し、ゲームシステムもパワーアップ。実際の筐体で音楽に合わせて手を動かす楽しさを体験してください。
							</p>
							<div className="outline-links">
								<Link href="/music" className="outline-link">
									収録楽曲 <span aria-hidden="true">›</span>
								</Link>
								<Link href="/rankings" className="outline-link">
									ランキング <span aria-hidden="true">›</span>
								</Link>
							</div>
						</div>
					</div>
				</section>

				<section className="gallery-section" aria-labelledby="gallery-title">
					<h2 id="gallery-title" className="sr-only">
						ゲーム画面と前回の展示
					</h2>
					<div className="gallery-strip">
						{gallery.map((image) => (
							<figure key={image.src} className="gallery-strip__item">
								<Image
									src={image.src}
									alt={image.alt}
									width={2577}
									height={1924}
									sizes="(max-width: 640px) 78vw, 32vw"
								/>
							</figure>
						))}
					</div>
					<p>ゲーム画面や去年の展示の様子</p>
				</section>

				<section id="information" className="home-section information-section">
					<Heading>INFORMATION</Heading>
					<div className="event-card">
						<div className="event-card__dates">
							<div>
								<span>
									本祭
									<br />
									1日目
								</span>
								<p>
									<small>2026</small>10.31<small>（土）</small>
								</p>
							</div>
							<div>
								<span>
									本祭
									<br />
									2日目
								</span>
								<p>
									<small>2026</small>11.01<small>（日）</small>
								</p>
							</div>
						</div>
						<p className="event-card__detail">
							<span className="event-card__icon" aria-hidden="true">
								⌖
							</span>
							{eventInformation.venue}
						</p>
						<p className="event-card__detail">
							<span className="event-card__icon" aria-hidden="true">
								¥
							</span>
							1 PLAY&nbsp; {eventInformation.playPrice}円
						</p>
					</div>
					<p className="information-section__intro">
						企画の場所や開催情報は、雙峰祭公式の企画検索システムから確認できます。
					</p>
					<a
						className="outline-link information-section__button"
						href="https://search.sohosai.com/project/130"
						target="_blank"
						rel="noreferrer"
					>
						企画の情報はこちら <span aria-hidden="true">›</span>
					</a>
				</section>

				<section className="home-section updates-section">
					<Heading>FOLLOW US</Heading>
					<p>XLAIRの最新情報は公式Xでお知らせします。</p>
					<a
						className="solid-link"
						href="https://x.com/XLAIR_Project"
						target="_blank"
						rel="noreferrer"
					>
						Xの投稿をチェック <span aria-hidden="true">↗</span>
					</a>
				</section>
			</main>
		</PageShell>
	);
}
