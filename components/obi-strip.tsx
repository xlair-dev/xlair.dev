import type { CSSProperties } from "react";
import "./obi-strip.css";

type ResponsiveHeight =
	| string
	| Partial<Record<"base" | "sm" | "md" | "lg" | "xl" | "2xl", string>>;

type ObiStripProps = {
	className?: string;
	height?: ResponsiveHeight;
};

function buildHeightStyle(
	height?: ResponsiveHeight,
): CSSProperties | undefined {
	if (!height) {
		return undefined;
	}

	const properties: Record<string, string> = {};
	const assign = (token: string, value?: string) => {
		if (!value) {
			return;
		}

		properties[`--obi-height-${token}`] = value;
	};

	if (typeof height === "string") {
		assign("base", height);
	} else {
		assign("base", height.base);
		assign("sm", height.sm);
		assign("md", height.md);
		assign("lg", height.lg);
		assign("xl", height.xl);
		assign("2xl", height["2xl"]);
	}

	return properties as CSSProperties;
}

export default function ObiStrip({ className, height }: ObiStripProps) {
	const wrapperClassName = className
		? `pointer-events-none absolute inset-x-0 top-0 select-none ${className}`
		: "pointer-events-none absolute inset-x-0 top-0 select-none";

	const style = buildHeightStyle(height);

	return (
		<div className={wrapperClassName} aria-hidden="true">
			<div className="obi-strip" style={style} />
		</div>
	);
}
