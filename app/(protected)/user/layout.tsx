import SideBar from "./components/SideBar";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="max-w-screen min-h-screen flex relative">
            <SideBar />
            {children}
        </main>
    )
}