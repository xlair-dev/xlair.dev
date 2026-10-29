import type { ReactNode } from "react";
import BrandBlurBackground from "@/components/brand-blur-background";
import Footer from "@/components/footer";
import ObiStrip from "@/components/obi-strip";
import SiteHeader from "@/components/site-header";

export default function PageShell({ children }: { children: ReactNode }) {
	return (
		<BrandBlurBackground className="site-page">
			<ObiStrip height={{ base: "10px", sm: "14px", lg: "18px" }} />
			<SiteHeader />
			{children}
			<Footer />
		</BrandBlurBackground>
	);
}
