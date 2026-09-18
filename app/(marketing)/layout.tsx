import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import KintsugiScrollbar from "../components/scrollbar/Kintsugi/KintsugiScroll";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
            <KintsugiScrollbar />
        </>
    )
}