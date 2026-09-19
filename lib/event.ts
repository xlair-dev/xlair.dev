export const eventInformation = {
	name: "雙峰祭",
	year: 2025,
	startDate: "11.02",
	endDate: "11.03",
	venue: "筑波大学 2D304 教室",
	playPrice: 100,
} as const;

export const eventDescription = `新作音ゲーム「XLAIR」を、筑波大学 ${eventInformation.name}${eventInformation.year} にて展示します。XLAIR は、画面に表示されるノーツに合わせてスライダーをなぞったりボタンを押したりすることで楽曲を演奏する、リズムアクション型の音楽ゲームです。当日はぜひ ${eventInformation.venue} にお越しください！`;
