import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/heading";
import Gallery from "@/components/home/gallery";
import styles from "./about.module.css";

export default function AboutSection() {
	return (
		<section
			id="about"
			className={`${styles.section} mx-auto flex w-[calc(100%-40px)] max-w-[1520px] flex-col items-center`}
		>
			<Heading>ABOUT</Heading>
			<div className={`${styles.grid} grid w-full items-start`}>
				<div className={styles.video}>
					<iframe
						src="https://www.youtube-nocookie.com/embed/-ibQZIVq8Rw"
						title="XLAIR 企画 CM"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
						loading="lazy"
					/>
				</div>
				<div className={styles.copy}>
					<div className={styles.brand}>
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
					<div
						className={`${styles.links} flex flex-col gap-3 min-[701px]:flex-row`}
					>
						<Link href="/music" className={`${styles.link} brand-border`}>
							収録楽曲 <span className={styles.arrow} aria-hidden="true" />
						</Link>
						<Link href="/rankings" className={`${styles.link} brand-border`}>
							ランキング <span className={styles.arrow} aria-hidden="true" />
						</Link>
					</div>
				</div>
			</div>
			<Gallery />
		</section>
	);
}
