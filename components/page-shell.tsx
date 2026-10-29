import type { ReactNode } from "react";
import BrandBlurBackground from "@/components/brand-blur-background";
import Footer from "@/components/footer";
import ObiStrip from "@/components/obi-strip";
import SiteHeader from "@/components/site-header";

export default function PageShell({ children }: { children: ReactNode }) {
	return (
		<BrandBlurBackground className="site-page">
			<ObiStrip height={{ base: "72px", sm: "90px", lg: "120px" }} />
			<SiteHeader />
			{children}
			<Footer />
		</BrandBlurBackground>
	);
}
