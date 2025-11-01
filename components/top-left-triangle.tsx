import type { ComponentPropsWithoutRef } from "react";

interface TopLeftTriangleProps
	extends Omit<ComponentPropsWithoutRef<"svg">, "viewBox"> {
	/**
	 * Size of the triangle icon in pixels or Tailwind size class
	 * @default "1em"
	 */
	size?: string | number;
}

/**
 * Right triangle with the right angle at the top-left corner.
 * Outline: top-left → top-right → bottom-left → top-left
 * Designed to be placed between text elements with customizable size.
 */
export default function TopLeftTriangle({
	size,
	className = "",
	...props
}: TopLeftTriangleProps) {
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
				d="M0.5 0.5L23.5 0.5L0.5 23.5Z"
				stroke="currentColor"
				strokeWidth="0.75"
				strokeLinecap="butt"
			/>
		</svg>
	);
}

