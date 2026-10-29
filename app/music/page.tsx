import Image from "next/image";
import Heading from "@/components/heading";
import PageShell from "@/components/page-shell";
import { resolveApiUrl } from "@/lib/api";
import { getMusicCatalog } from "@/lib/sync";

export const revalidate = 300;

export default async function MusicPage() {
	let songs: Awaited<ReturnType<typeof getMusicCatalog>> = [];
	let unavailable = false;
	try {
		songs = (await getMusicCatalog()).filter((music) => !music.isTest);
	} catch (error) {
		console.error("Failed to load music catalog:", error);
		unavailable = true;
	}

	return (
		<PageShell>
			<main className="subpage-main music-page">
				<Heading as="h1">MUSIC</Heading>
				<p className="subpage-description">
					オリジナル曲・提供曲、全曲を収録しています
					<br />
					ゲーム譜面はすべてオリジナル制作です
				</p>
				{unavailable ? (
					<p className="catalog-message" role="status">
						楽曲情報を取得できませんでした。
					</p>
				) : songs.length === 0 ? (
					<p className="catalog-message">現在、公開中の楽曲はありません。</p>
				) : (
					<ul className="music-grid">
						{songs.map((song, index) => {
							const jacket = song.jacketUrl
								? resolveApiUrl(song.jacketUrl)
								: null;
							return (
								<li key={song.id} className="music-card">
									<div className="music-card__jacket">
										{jacket ? (
											<Image
												src={jacket}
												alt={`${song.title} のジャケット`}
												fill
												sizes="(max-width: 640px) 22vw, 132px"
												loading={index === 0 ? "eager" : "lazy"}
												unoptimized
											/>
										) : (
											<span
												className="music-card__placeholder"
												aria-hidden="true"
											/>
										)}
									</div>
									<div className="music-card__details">
										<h2>{song.title}</h2>
										<p>{song.artist}</p>
										<p className="music-card__year">
											{new Intl.DateTimeFormat("en", {
												timeZone: "Asia/Tokyo",
												year: "numeric",
											}).format(new Date(song.registrationDate))}
										</p>
									</div>
								</li>
							);
						})}
					</ul>
				)}
			</main>
		</PageShell>
	);
}
