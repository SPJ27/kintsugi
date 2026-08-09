import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}