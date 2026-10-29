import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";
import Heading from "@/components/heading";
import XTimeline from "@/components/home/x-timeline";
import { eventInformation, formatEventWeekday } from "@/lib/event";
import styles from "./information.module.css";

export default function InformationSection() {
	return (
		<section
			id="information"
			className={`${styles.section} mx-auto flex w-[calc(100%-40px)] max-w-[1520px] flex-col items-center`}
		>
			<Heading>INFORMATION</Heading>
			<div className={styles.card}>
				<div className={styles.dates}>
					<EventDate
						label={
							<>
								本祭
								<br />
								1日目
							</>
						}
						date={eventInformation.startDate}
						weekday={formatEventWeekday(eventInformation.startDateKey)}
					/>
					<EventDate
						label={
							<>
								本祭
								<br />
								2日目
							</>
						}
						date={eventInformation.endDate}
						weekday={formatEventWeekday(eventInformation.endDateKey)}
					/>
				</div>
				<p className={styles.detail}>
					<span
						className={`${styles.icon} ${styles.locationIcon}`}
						aria-hidden="true"
					>
						<FontAwesomeIcon icon={faLocationDot} />
					</span>
					{eventInformation.venue}
				</p>
				<p className={styles.detail}>
					<span className={styles.icon} aria-hidden="true">
						¥
					</span>
					1 PLAY&nbsp; {eventInformation.playPrice}円
				</p>
			</div>
			<a
				className={`${styles.projectLink} brand-border`}
				href="https://search.sohosai.com/project/130"
				target="_blank"
				rel="noreferrer"
			>
				企画の情報はこちら <span className={styles.arrow} aria-hidden="true" />
			</a>
			<XTimeline />
			<a
				className={`${styles.xLink} brand-border`}
				href="https://x.com/XLAIR_Project"
				target="_blank"
				rel="noreferrer"
			>
				最新情報はXをチェック{" "}
				<span className={styles.arrow} aria-hidden="true" />
			</a>
		</section>
	);
}

function EventDate({
	label,
	date,
	weekday,
}: {
	label: ReactNode;
	date: string;
	weekday: string;
}) {
	return (
		<div className={styles.dateRow}>
			<span className={styles.dateLabel}>{label}</span>
			<p className={styles.date}>
				<small className={styles.year}>{eventInformation.year}</small>
				<span>
					{date}
					<small>（{weekday}）</small>
				</span>
			</p>
		</div>
	);
}
