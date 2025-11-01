import type { ReactNode } from "react";
import "./brand-blur-background.css";

type BrandBlurBackgroundProps = {
	children: ReactNode;
	className?: string;
};

export default function BrandBlurBackground({
	children,
	className,
}: BrandBlurBackgroundProps) {
	const wrapperClassName = className
		? `brand-blur-background ${className}`
		: "brand-blur-background";

	return (
		<div className={wrapperClassName}>
			<div className="brand-blur-layer" aria-hidden="true">
				<span className="brand-blur-orbit brand-blur-orbit--1" />
				<span className="brand-blur-orbit brand-blur-orbit--2" />
				<span className="brand-blur-orbit brand-blur-orbit--3 brand-blur-orbit--reverse" />
				<span className="brand-blur-orbit brand-blur-orbit--4 brand-blur-orbit--reverse" />
			</div>
			{children}
		</div>
	);
}
