import type { CSSProperties } from "react";

export type SvgIconSize = string | number;

export function getSquareSizeProps(
	size?: SvgIconSize,
): Pick<CSSProperties, "width" | "height"> {
	if (!size) {
		return {};
	}

	const sizeValue = typeof size === "number" ? `${size}px` : size;
	return { width: sizeValue, height: sizeValue };
}
