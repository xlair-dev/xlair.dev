"use client";

import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
	{ href: "/#about", label: "ABOUT" },
	{ href: "/music", label: "MUSIC" },
	{ href: "/members", label: "MEMBER" },
	{ href: "/rankings", label: "RANKING" },
	{ href: "/#information", label: "INFORMATION" },
] as const;

export default function SiteHeader() {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!open) return;
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", closeOnEscape);
		return () => window.removeEventListener("keydown", closeOnEscape);
	}, [open]);

	return (
		<header className="site-header">
			<nav className="site-header__nav" aria-label="メインナビゲーション">
				<button
					type="button"
					className="site-menu-button"
					aria-label={open ? "メニューを閉じる" : "メニューを開く"}
					aria-expanded={open}
					aria-controls="site-menu"
					onClick={() => setOpen(!open)}
				>
					<FontAwesomeIcon icon={open ? faXmark : faBars} />
				</button>
			</nav>
			{open && (
				<div className="site-menu-backdrop">
					<button
						className="site-menu-backdrop__dismiss"
						type="button"
						aria-label="メニューを閉じる"
						onClick={() => setOpen(false)}
					/>
					<nav
						id="site-menu"
						className="site-menu-panel"
						aria-label="サイトメニュー"
					>
						{links.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								onClick={() => setOpen(false)}
							>
								{link.label}
							</Link>
						))}
						<div className="site-menu-panel__social">
							<a
								href="https://x.com/XLAIR_Project"
								aria-label="XLAIR Project on X"
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon icon={faXTwitter} />
							</a>
							<a
								href="https://github.com/xlair-dev"
								aria-label="XLAIR Project on GitHub"
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon icon={faGithub} />
							</a>
						</div>
					</nav>
				</div>
			)}
		</header>
	);
}
