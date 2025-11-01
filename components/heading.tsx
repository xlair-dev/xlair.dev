import TopLeftTriangle from "@/components/top-left-triangle";
import TopRightTriangle from "@/components/top-right-triangle";
import type { ReactNode } from "react";

interface HeadingProps {
	/**
	 * The text content of the heading
	 */
	children: ReactNode;
	/**
	 * Additional CSS classes for the container
	 */
	className?: string;
	/**
	 * Additional CSS classes for the text element
	 */
	textClassName?: string;
	/**
	 * Additional CSS classes for the triangle icons
	 */
	triangleClassName?: string;
	/**
	 * Triangle size classes (responsive)
	 * @default "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
	 */
	triangleSizeClassName?: string;
	/**
	 * Text size classes (responsive)
	 * @default "text-xl sm:text-2xl md:text-3xl lg:text-4xl"
	 */
	textSizeClassName?: string;
}

/**
 * Heading component with triangles on both sides.
 * Responsive triangle sizes can be customized via triangleSizeClassName.
 * Text size and color are responsive and use brand color by default.
 */
export default function Heading({
	children,
	className = "",
	textClassName = "",
	triangleClassName = "text-brand-main",
	triangleSizeClassName = "w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-13 lg:h-13",
	textSizeClassName = "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
}: HeadingProps) {
	const defaultTextClasses = "text-brand-main";
	const combinedTextClassName = textClassName
		? `${defaultTextClasses} ${textSizeClassName} ${textClassName}`
		: `${defaultTextClasses} ${textSizeClassName}`;

	return (
		<div className={`flex items-center gap-6 ${className}`}>
			<TopLeftTriangle
				className={`${triangleClassName} ${triangleSizeClassName}`}
			/>
			<span className={combinedTextClassName}>{children}</span>
			<TopRightTriangle
				className={`${triangleClassName} ${triangleSizeClassName}`}
			/>
		</div>
	);
}
