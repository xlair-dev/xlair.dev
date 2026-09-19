import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const navigationLinks = [
	{ href: "https://sohosai.com", label: "雙峰祭公式サイト" },
	{
		href: "https://search.sohosai.com/projects/6",
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
		href: "https://x.com/xlair_project",
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
				src="/logo.svg"
				alt="XLAIR"
				width={200}
				height={100}
				className={logoClassName}
			/>
			<p className={copyrightClassName}>© XLAIR Project ALL rights reserved.</p>
		</div>
	);
}

export default function Footer() {
	return (
		<footer className="bg-white w-full pt-12 pb-14 sm:pb-12 px-4 sm:px-6 md:px-8 lg:px-12">
			<div className="max-w-[90vw] mx-auto">
				<div className="hidden sm:flex justify-between items-center">
					<FooterBrand
						className="flex flex-col gap-3 sm:gap-4"
						logoClassName="w-32 sm:w-40 md:w-48 h-auto"
						copyrightClassName="text-gray-600 text-sm sm:text-base"
					/>
					<div className="flex items-center gap-4 sm:gap-6 md:gap-8 text-gray-600 text-sm sm:text-base md:text-lg">
						<FooterNavigation className="flex items-center gap-4 sm:gap-6 md:gap-8" />
						<FooterSocialLinks
							className="flex items-center gap-4 sm:gap-6 md:gap-8"
							iconClassName="text-xl sm:text-2xl md:text-3xl"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-6 sm:hidden">
					<FooterSocialLinks
						className="flex items-center gap-4 justify-center text-gray-600"
						iconClassName="text-xl"
					/>
					<FooterNavigation className="flex flex-col items-center gap-2 text-gray-600 text-sm" />
					<FooterBrand
						className="flex flex-col gap-3 items-center"
						logoClassName="w-24 h-auto"
						copyrightClassName="text-gray-600 text-xs"
					/>
				</div>
			</div>
		</footer>
	);
}
