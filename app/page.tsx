import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/heading";
import NavigationArrow from "@/components/navigation-arrow";
import PageShell from "@/components/page-shell";
import StatisticsSection from "@/components/statistics-section";
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

export default async function Home() {
	const statistics = await fetchStatistics();
	return (
		<PageShell>
			<main>
				<section className="hero" aria-labelledby="hero-title">
					<div className="hero__decoration" aria-hidden="true" />
					<Image
						className="hero__art"
						src="/effect.png"
						alt=""
						width={700}
						height={1000}
						priority
						aria-hidden="true"
					/>
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
							<div className="hero__date-line">
								<span className="hero__year">{eventInformation.year}</span>
								<p>
									<span className="hero__day">
										{eventInformation.startDate}
										<small>（土）</small>
									</span>
									<NavigationArrow className="hero__date-arrow" />
									<span className="hero__day">
										{eventInformation.endDate}
										<small>（日）</small>
									</span>
								</p>
							</div>
							<strong>筑波大学「雙峰祭」にて展示中</strong>
						</div>
						{statistics && <StatisticsSection statistics={statistics} />}
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
								<Link href="/music" className="outline-link brand-border">
									収録楽曲{" "}
									<span className="outline-link__arrow" aria-hidden="true" />
								</Link>
								<Link href="/rankings" className="outline-link brand-border">
									ランキング{" "}
									<span className="outline-link__arrow" aria-hidden="true" />
								</Link>
							</div>
						</div>
					</div>
					<section className="gallery-section" aria-labelledby="gallery-title">
						<h2 id="gallery-title" className="sr-only">
							ゲーム画面と前回の展示
						</h2>
						<div className="gallery-strip">
							<div className="gallery-strip__track">
								{gallery.map((image) => (
									<figure key={image.src} className="gallery-strip__item">
										<Image
											src={image.src}
											alt={image.alt}
											width={2577}
											height={1924}
											sizes="(max-width: 700px) calc((100vw - 52px) / 2), (max-width: 1920px) 16.82vw, 323px"
										/>
									</figure>
								))}
								{gallery.map((image) => (
									<figure
										key={`${image.src}-loop`}
										className="gallery-strip__item"
										aria-hidden="true"
									>
										<Image
											src={image.src}
											alt=""
											width={2577}
											height={1924}
											sizes="(max-width: 700px) calc((100vw - 52px) / 2), (max-width: 1920px) 16.82vw, 323px"
										/>
									</figure>
								))}
							</div>
						</div>
						<p>ゲーム画面や去年の展示の様子</p>
					</section>
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
								<p className="event-card__date">
									<small className="event-card__year">
										{eventInformation.year}
									</small>
									<span>
										{eventInformation.startDate}
										<small>（土）</small>
									</span>
								</p>
							</div>
							<div>
								<span>
									本祭
									<br />
									2日目
								</span>
								<p className="event-card__date">
									<small className="event-card__year">
										{eventInformation.year}
									</small>
									<span>
										{eventInformation.endDate}
										<small>（日）</small>
									</span>
								</p>
							</div>
						</div>
						<p className="event-card__detail">
							<span
								className="event-card__icon event-card__icon--location"
								aria-hidden="true"
							>
								<FontAwesomeIcon icon={faLocationDot} />
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
					<a
						className="outline-link brand-border information-section__button"
						href="https://search.sohosai.com/project/130"
						target="_blank"
						rel="noreferrer"
					>
						企画の情報はこちら{" "}
						<span className="outline-link__arrow" aria-hidden="true" />
					</a>
					<div className="updates-section__feed">
						<p>XLAIRの投稿を公式Xでご覧いただけます。</p>
					</div>
					<a
						className="solid-link brand-border"
						href="https://x.com/XLAIR_Project"
						target="_blank"
						rel="noreferrer"
					>
						最新情報はXをチェック{" "}
						<span className="solid-link__arrow" aria-hidden="true" />
					</a>
				</section>
			</main>
		</PageShell>
	);
}
