import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { eventInformation } from "@/lib/event";

const navigationLinks = [
	{ href: "https://sohosai.com", label: "雙峰祭公式サイト" },
	{
		href: "https://search.sohosai.com/project/130",
		label: "企画検索システム",
	},
] as const;

const socialLinks: ReadonlyArray<{
	href: string;
	label: string;
	icon: IconDefinition;
	external: boolean;
}> = [
	{
		href: "mailto:contact@xlair.dev",
		label: "Email",
		icon: faEnvelope,
		external: false,
	},
	{
		href: "https://x.com/XLAIR_Project",
		label: "X (Twitter)",
		icon: faXTwitter,
		external: true,
	},
	{
		href: "https://github.com/xlair-dev",
		label: "GitHub",
		icon: faGithub,
		external: true,
	},
];

type FooterLinksProps = {
	className: string;
};

function FooterNavigation({ className }: FooterLinksProps) {
	return (
		<div className={className}>
			{navigationLinks.map((link) => (
				<a
					key={link.href}
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-brand-main transition-colors duration-400 ease-in-out"
				>
					{link.label}
				</a>
			))}
		</div>
	);
}

function FooterSocialLinks({
	className,
	iconClassName,
}: FooterLinksProps & { iconClassName: string }) {
	return (
		<div className={className}>
			{socialLinks.map((link) => (
				<a
					key={link.href}
					href={link.href}
					{...(link.external
						? { target: "_blank", rel: "noopener noreferrer" }
						: {})}
					className="hover:text-brand-main transition-colors duration-400 ease-in-out"
					aria-label={link.label}
				>
					<FontAwesomeIcon icon={link.icon} className={iconClassName} />
				</a>
			))}
		</div>
	);
}

function FooterBrand({
	className,
	logoClassName,
	copyrightClassName,
}: {
	className: string;
	logoClassName: string;
	copyrightClassName: string;
}) {
	return (
		<div className={className}>
			<Image
				src="/logo.webp"
				alt="XLAIR"
				width={2397}
				height={451}
				className={logoClassName}
			/>
			<p className={copyrightClassName}>
				© {eventInformation.year} XLAIR Project ALL rights reserved.
			</p>
		</div>
	);
}

export default function Footer() {
	return (
		<footer className="site-footer">
			<div className="site-footer__inner">
				<div className="site-footer__desktop">
					<FooterBrand
						className="site-footer__brand"
						logoClassName="site-footer__logo"
						copyrightClassName="site-footer__copyright"
					/>
					<div className="site-footer__desktop-links">
						<FooterNavigation className="site-footer__navigation" />
						<FooterSocialLinks
							className="site-footer__social"
							iconClassName=""
						/>
					</div>
				</div>
				<div className="site-footer__mobile">
					<FooterSocialLinks className="site-footer__social" iconClassName="" />
					<FooterNavigation className="site-footer__navigation" />
					<FooterBrand
						className="site-footer__brand"
						logoClassName="site-footer__logo"
						copyrightClassName="site-footer__copyright"
					/>
				</div>
			</div>
		</footer>
	);
}
