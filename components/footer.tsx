import {
	type IconDefinition,
	type IconName,
	findIconDefinition,
} from "@fortawesome/fontawesome-svg-core";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

library.add(fas, far, fab);

// Helper object to get icon by prefix and name
const byPrefixAndName = {
	far: new Proxy({} as Record<string, IconDefinition>, {
		get: (_target, prop: string) =>
			findIconDefinition({
				prefix: "far",
				iconName: prop as IconName,
			}) as IconDefinition,
	}),
	fab: new Proxy({} as Record<string, IconDefinition>, {
		get: (_target, prop: string) =>
			findIconDefinition({
				prefix: "fab",
				iconName: prop as IconName,
			}) as IconDefinition,
	}),
	fas: new Proxy({} as Record<string, IconDefinition>, {
		get: (_target, prop: string) =>
			findIconDefinition({
				prefix: "fas",
				iconName: prop as IconName,
			}) as IconDefinition,
	}),
};

/**
 * Footer component with logo, copyright, links, and social media icons.
 * Responsive layout with different arrangements for desktop and mobile.
 */
export default function Footer() {
	return (
		<footer className="bg-white w-full py-8 sm:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
			<div className="max-w-[90vw] mx-auto">
				{/* Desktop layout */}
				<div className="hidden sm:flex justify-between items-center">
					{/* Left side */}
					<div className="flex flex-col gap-3 sm:gap-4">
						<Image
							src="/logo.svg"
							alt="XLAIR"
							width={200}
							height={100}
							className="w-32 sm:w-40 md:w-48 h-auto"
						/>
						<p className="text-gray-600 text-sm sm:text-base">
							© 2025 XLAIR Project ALL rights reserved.
						</p>
					</div>
					{/* Right side */}
					<div className="flex items-center gap-4 sm:gap-6 md:gap-8 text-gray-600 text-sm sm:text-base md:text-lg">
						<a
							href="https://sohosai.com"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-brand-main transition-colors duration-400 ease-in-out"
						>
							雙峰祭公式サイト
						</a>
						<a
							href="https://search.sohosai.com/projects/6"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-brand-main transition-colors duration-400 ease-in-out"
						>
							企画検索システム
						</a>
						<a
							href="mailto:contact@xlair.dev"
							className="hover:text-brand-main transition-colors duration-400 ease-in-out"
							aria-label="Email"
						>
							<FontAwesomeIcon
								icon={byPrefixAndName.far.envelope}
								className="text-xl sm:text-2xl md:text-3xl"
							/>
						</a>
						<a
							href="https://x.com/xlair_project"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-brand-main transition-colors duration-400 ease-in-out"
							aria-label="X (Twitter)"
						>
							<FontAwesomeIcon
								icon={byPrefixAndName.fab["x-twitter"]}
								className="text-xl sm:text-2xl md:text-3xl"
							/>
						</a>
						<a
							href="https://github.com/xlair-dev"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-brand-main transition-colors duration-400 ease-in-out"
							aria-label="GitHub"
						>
							<FontAwesomeIcon
								icon={byPrefixAndName.fab.github}
								className="text-xl sm:text-2xl md:text-3xl"
							/>
						</a>
					</div>
				</div>
				{/* Mobile layout */}
				<div className="flex flex-col gap-6 sm:hidden">
					{/* Icons */}
					<div className="flex items-center gap-4 justify-center">
						<a
							href="mailto:contact@xlair.dev"
							className="text-gray-600 hover:text-brand-main transition-colors duration-400 ease-in-out"
							aria-label="Email"
						>
							<FontAwesomeIcon
								icon={byPrefixAndName.far.envelope}
								className="text-xl"
							/>
						</a>
						<a
							href="https://x.com/xlair_project"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-600 hover:text-brand-main transition-colors duration-400 ease-in-out"
							aria-label="X (Twitter)"
						>
							<FontAwesomeIcon
								icon={byPrefixAndName.fab["x-twitter"]}
								className="text-xl"
							/>
						</a>
						<a
							href="https://github.com/xlair-dev"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-600 hover:text-brand-main transition-colors duration-400 ease-in-out"
							aria-label="GitHub"
						>
							<FontAwesomeIcon
								icon={byPrefixAndName.fab.github}
								className="text-xl"
							/>
						</a>
					</div>
					{/* Links */}
					<div className="flex flex-col items-center gap-2 text-gray-600 text-sm">
						<a
							href="https://sohosai.com"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-brand-main transition-colors duration-400 ease-in-out"
						>
							雙峰祭公式サイト
						</a>
						<a
							href="https://search.sohosai.com/projects/6"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-brand-main transition-colors duration-400 ease-in-out"
						>
							企画検索システム
						</a>
					</div>
					{/* Logo and copyright */}
					<div className="flex flex-col gap-3 items-center">
						<Image
							src="/logo.svg"
							alt="XLAIR"
							width={200}
							height={100}
							className="w-24 h-auto"
						/>
						<p className="text-gray-600 text-xs">
							© 2025 XLAIR Project ALL rights reserved.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
