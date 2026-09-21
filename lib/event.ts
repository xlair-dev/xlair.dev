export const eventInformation = {
	name: "雙峰祭",
	year: 2026,
	startDate: "10.31",
	endDate: "11.01",
	venue: "筑波大学 1B402 教室",
	playPrice: 100,
	startDateKey: "2026-10-31",
	endDateKey: "2026-11-01",
} as const;

const tokyoDateFormatter = new Intl.DateTimeFormat("en-CA", {
	timeZone: "Asia/Tokyo",
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
});

function getTokyoDateKey(date: Date): string {
	const dateParts = Object.fromEntries(
		tokyoDateFormatter
			.formatToParts(date)
			.filter(({ type }) => type !== "literal")
			.map(({ type, value }) => [type, value]),
	);
	return `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
}

export type EventPhase = "before" | "during" | "after";

/**
 * Returns the event phase for the current date in Japan.
 * @requires The event dates in `eventInformation` use the Asia/Tokyo timezone.
 */
export function getEventPhase(date = new Date()): EventPhase {
	const dateKey = getTokyoDateKey(date);
	if (dateKey < eventInformation.startDateKey) {
		return "before";
	}
	if (dateKey > eventInformation.endDateKey) {
		return "after";
	}
	return "during";
}

export const eventPhaseText = {
	before: {
		topConnector: "に向けて",
		topStatus: "開発中",
		statistics: `${eventInformation.year}に向けて開発中！`,
	},
	during: {
		topConnector: "にて",
		topStatus: "公開中",
		statistics: "にて公開中！",
	},
	after: {
		topConnector: "で",
		topStatus: "公開しました",
		statistics: `${eventInformation.year}で公開しました！`,
	},
} as const;

export const eventDescription = `新作音ゲーム「XLAIR」を、筑波大学 ${eventInformation.name}${eventInformation.year} に向けて開発しています。XLAIR は、画面に表示されるノーツに合わせてスライダーをなぞったりボタンを押したりすることで楽曲を演奏する、リズムアクション型の音楽ゲームです。会期中はぜひ ${eventInformation.venue} にお越しください！`;
