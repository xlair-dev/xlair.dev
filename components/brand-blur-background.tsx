import type { CSSProperties, ReactNode } from "react";
import "./brand-blur-background.css";

type BrandBlurBackgroundProps = {
	children: ReactNode;
	className?: string;
	offset?: string;
};

export default function BrandBlurBackground({
	children,
	className,
	offset,
}: BrandBlurBackgroundProps) {
	const wrapperClassName = className
		? `brand-blur-background ${className}`
		: "brand-blur-background";

	const layerStyle: CSSProperties | undefined = offset
		? ({ "--brand-blur-offset": offset } as CSSProperties)
		: undefined;

	return (
		<div className={wrapperClassName}>
			<div className="brand-blur-layer" style={layerStyle} aria-hidden="true">
				<span className="brand-blur-orbit brand-blur-orbit--1" />
				<span className="brand-blur-orbit brand-blur-orbit--2" />
				<span className="brand-blur-orbit brand-blur-orbit--3 brand-blur-orbit--reverse" />
				<span className="brand-blur-orbit brand-blur-orbit--4 brand-blur-orbit--reverse" />
			</div>
			{children}
		</div>
	);
}
