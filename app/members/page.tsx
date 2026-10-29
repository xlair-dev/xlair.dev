import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Heading from "@/components/heading";
import PageShell from "@/components/page-shell";

type TeamMember = {
	name: string;
	role: string;
	github?: string;
	x?: string;
};

const teams: { id: string; name: string; members: TeamMember[] }[] = [
	{
		id: "producer-developer",
		name: "PRODUCER & DEVELOPER",
		members: [
			{
				name: "n4mlz",
				role: "Producer / Developer",
				github: "n4mlz",
				x: "n4mlz",
			},
			{
				name: "Ryoga.exe",
				role: "Developer",
				github: "Ryoga-exe",
				x: "Ryoga_exe",
			},
		],
	},
	{
		id: "music",
		name: "MUSIC",
		members: [
			{ name: "Swkima", role: "Music", github: "swkima-dev", x: "swkima" },
			{ name: "Tommy", role: "Music" },
		],
	},
	{
		id: "design",
		name: "DESIGN",
		members: [
			{ name: "hui", role: "Design", github: "scabi0sa", x: "otafukunante" },
			{
				name: "socha",
				role: "Design",
				github: "HareyakaYuruyaka",
				x: "kani__no__",
			},
		],
	},
];

export default function MembersPage() {
	return (
		<PageShell>
			<main className="subpage-main members-page">
				<Heading as="h1">MEMBER</Heading>
				<div className="team-list">
					{teams.map((team) => (
						<section
							key={team.name}
							className="team-section"
							aria-labelledby={`team-${team.id}`}
						>
							<h2 id={`team-${team.id}`}>{team.name}</h2>
							<ul>
								{team.members.map((member) => (
									<li key={member.name} className="member-card">
										<div className="member-avatar" aria-hidden="true">
											{member.name.slice(0, 1)}
										</div>
										<div className="member-card__info">
											<p className="member-card__name">{member.name}</p>
											<p className="member-card__role">{member.role}</p>
											<div className="member-card__links">
												{member.github && (
													<a
														href={`https://github.com/${member.github}`}
														target="_blank"
														rel="noreferrer"
														aria-label={`${member.name} GitHub`}
													>
														<FontAwesomeIcon icon={faGithub} />
													</a>
												)}
												{member.x && (
													<a
														href={`https://x.com/${member.x}`}
														target="_blank"
														rel="noreferrer"
														aria-label={`${member.name} X`}
													>
														<FontAwesomeIcon icon={faXTwitter} />
													</a>
												)}
											</div>
										</div>
									</li>
								))}
							</ul>
						</section>
					))}
				</div>
				<section className="notes-design" aria-labelledby="notes-design-title">
					<h2 id="notes-design-title">NOTES DESIGN</h2>
					<p>筑波大学音楽ゲームサークル TEA（Tsukuba Evolved Another）</p>
					<div className="member-card__links">
						<a
							href="https://tsukubaevolvedanot.wixsite.com/tea-official"
							target="_blank"
							rel="noreferrer"
							aria-label="TEA website"
						>
							⌂
						</a>
						<a
							href="https://x.com/TEA_tkb"
							target="_blank"
							rel="noreferrer"
							aria-label="TEA on X"
						>
							<FontAwesomeIcon icon={faXTwitter} />
						</a>
					</div>
				</section>
			</main>
		</PageShell>
	);
}
