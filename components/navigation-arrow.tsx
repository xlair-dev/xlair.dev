import type { ComponentPropsWithoutRef } from "react";
import { getSquareSizeProps, type SvgIconSize } from "@/components/icon-size";

interface NavigationArrowProps
	extends Omit<ComponentPropsWithoutRef<"svg">, "viewBox"> {
	/**
	 * Size of the arrow icon in CSS units or pixels
	 * @default "1em"
	 */
	size?: SvgIconSize;
}

/**
 * Right-pointing triangle arrow for navigation.
 * Designed to be placed between text elements with customizable size.
 */
export default function NavigationArrow({
	size,
	className = "",
	...props
}: NavigationArrowProps) {
	const sizeProps = getSquareSizeProps(size);

	return (
		<svg
			{...sizeProps}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`inline-block ${className}`}
			aria-hidden="true"
			{...props}
		>
			<path d="M10 6L16 12L10 18" fill="currentColor" />
		</svg>
	);
}
