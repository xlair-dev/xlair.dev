import Image from "next/image";
import NavigationArrow from "@/components/navigation-arrow";
import StatisticsSection from "@/components/statistics-section";
import { eventInformation, formatEventWeekday } from "@/lib/event";
import type { GlobalStatistics } from "@/lib/statistics";
import styles from "./hero.module.css";

export default function HomeHero({
	statistics,
}: {
	statistics: GlobalStatistics | null;
}) {
	return (
		<section
			className={`${styles.hero} grid min-h-[1077.75px] place-items-start justify-items-center overflow-hidden px-6 pt-[270px] pb-[100px] max-[700px]:min-h-[590.5px] max-[700px]:place-items-center max-[700px]:px-5 max-[700px]:pt-[104px] max-[700px]:pb-[54px]`}
			aria-labelledby="hero-title"
		>
			<div className={styles.decoration} aria-hidden="true" />
			<Image
				className={styles.art}
				src="/effect.png"
				alt=""
				width={700}
				height={1000}
				priority
				aria-hidden="true"
			/>
			<div className="relative z-10 flex w-full max-w-[1108px] flex-col items-center gap-0 text-center max-[700px]:gap-[22px]">
				<p className={styles.eyebrow}>ー リズムアクション型ゲーム ー</p>
				<h1 id="hero-title" className={styles.logo}>
					<Image
						src="/logo.webp"
						alt="XLAIR"
						width={2397}
						height={451}
						priority
					/>
				</h1>
				<div className={styles.date}>
					<div className={styles.dateLine}>
						<span className={styles.year}>{eventInformation.year}</span>
						<p className={styles.days}>
							<span>
								{eventInformation.startDate}
								<small>
									（{formatEventWeekday(eventInformation.startDateKey)}）
								</small>
							</span>
							<NavigationArrow className={styles.dateArrow} />
							<span>
								{eventInformation.endDate}
								<small>
									（{formatEventWeekday(eventInformation.endDateKey)}）
								</small>
							</span>
						</p>
					</div>
					<strong>筑波大学「雙峰祭」にて展示中</strong>
				</div>
				{statistics && <StatisticsSection statistics={statistics} />}
			</div>
		</section>
	);
}
