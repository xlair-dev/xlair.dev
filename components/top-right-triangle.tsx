import type { ComponentPropsWithoutRef } from "react";

interface TopRightTriangleProps
	extends Omit<ComponentPropsWithoutRef<"svg">, "viewBox"> {
	/**
	 * Size of the triangle icon in pixels or Tailwind size class
	 * @default "1em"
	 */
	size?: string | number;
}

/**
 * Right triangle with the right angle at the bottom-right corner.
 * Outline: top-right → bottom-right → bottom-left → top-right
 * Designed to be placed between text elements with customizable size.
 */
export default function TopRightTriangle({
	size,
	className = "",
	...props
}: TopRightTriangleProps) {
	const sizeValue = size
		? typeof size === "number"
			? `${size}px`
			: size
		: undefined;
	const sizeProps = sizeValue ? { width: sizeValue, height: sizeValue } : {};

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
			<path
				d="M23.5 0.5L23.5 23.5L0.5 23.5Z"
				stroke="currentColor"
				strokeWidth="0.75"
				strokeLinecap="butt"
			/>
		</svg>
	);
}

