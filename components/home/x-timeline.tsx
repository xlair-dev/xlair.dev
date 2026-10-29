"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./information.module.css";

const timelineUrl = "https://twitter.com/XLAIR_Project?ref_src=twsrc%5Etfw";

export default function XTimeline() {
	const timelineRef = useRef<HTMLElement>(null);
	const [unavailable, setUnavailable] = useState(false);

	const updateAvailability = useCallback(() => {
		const frame = timelineRef.current?.querySelector("iframe");
		if (frame && frame.getBoundingClientRect().height > 0) {
			setUnavailable(false);
		}
	}, []);

	useEffect(() => {
		const timeline = timelineRef.current;
		if (!timeline) return;

		const observer = new MutationObserver(updateAvailability);
		observer.observe(timeline, {
			attributes: true,
			attributeFilter: ["height", "style", "width"],
			childList: true,
			subtree: true,
		});
		const timeout = window.setTimeout(() => {
			const frame = timeline.querySelector("iframe");
			if (!frame || frame.getBoundingClientRect().height === 0) {
				setUnavailable(true);
			}
		}, 8000);

		return () => {
			observer.disconnect();
			window.clearTimeout(timeout);
		};
	}, [updateAvailability]);

	return (
		<>
			<section
				ref={timelineRef}
				className={styles.feed}
				aria-label="XLAIRの最新投稿"
			>
				<a
					className={`twitter-timeline ${styles.fallback} ${unavailable ? styles.hidden : ""}`}
					href={timelineUrl}
					data-height="589"
					data-theme="light"
				>
					XLAIR_Project のポスト
				</a>
				{unavailable && (
					<p className={styles.unavailable} role="status">
						<span>Xの投稿を読み込めませんでした。</span>
						<a
							href="https://x.com/XLAIR_Project"
							target="_blank"
							rel="noreferrer"
						>
							公式Xを見る
						</a>
					</p>
				)}
			</section>
			<Script
				src="https://platform.twitter.com/widgets.js"
				strategy="lazyOnload"
				onReady={updateAvailability}
			/>
		</>
	);
}
