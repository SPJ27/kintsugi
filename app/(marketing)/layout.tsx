import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";
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