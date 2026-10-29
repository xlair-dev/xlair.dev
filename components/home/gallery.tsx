import Image from "next/image";
import styles from "./gallery.module.css";

const images = [
	{ src: "/gallery/xlair-gameplay.png", alt: "XLAIRのゲーム画面" },
	{ src: "/gallery/xlair-tracks.png", alt: "XLAIRの収録楽曲" },
	{ src: "/gallery/sohosai-2025.png", alt: "2025年の雙峰祭で展示したXLAIR" },
] as const;
const loopedImages = [
	...images.map((image) => ({
		...image,
		key: `gallery-${image.src}`,
		duplicate: false,
	})),
	...images.map((image) => ({
		...image,
		key: `gallery-loop-${image.src}`,
		duplicate: true,
	})),
];

export default function Gallery() {
	return (
		<section className={styles.gallery} aria-labelledby="gallery-title">
			<h2 id="gallery-title" className="sr-only">
				ゲーム画面と前回の展示
			</h2>
			<div className={styles.viewport}>
				<div className={styles.track}>
					{loopedImages.map((image) => (
						<figure
							key={image.key}
							className={styles.item}
							aria-hidden={image.duplicate}
						>
							<Image
								src={image.src}
								alt={image.duplicate ? "" : image.alt}
								width={2577}
								height={1924}
								sizes="(max-width: 700px) calc((100vw - 52px) / 2), (max-width: 1920px) 16.82vw, 323px"
							/>
						</figure>
					))}
				</div>
			</div>
		</section>
	);
}
