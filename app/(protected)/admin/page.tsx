import { requireRole } from "@/lib/auth-guard";
import Link from "next/link";

export default async function page() {
    const objects = {
        'Tasks': {
            'Shop Fulfillment': '/fulfillment',
            'Shop Management': '/shop'
        },
        'Models': {
            'Users': '/users',
            'Projects': '/projects',
            'Ship Events': '/shipevents',
            'Logs': '/logs'
        }
    };

    return (
        <main>
            <div className="flex flex-col gap-4">
                {Object.entries(objects).map(([groupName, links]) => (
                    <div key={groupName}>
                        <h2 className="text-lg font-semibold mb-2">{groupName}</h2>
                        <div className="flex gap-4">
                            {Object.entries(links).map(([label, href]) => (
                                <Link className="bg-[#2A1A08] text-white px-6 py-2 rounded-xs hover:bg-[#3a250c]" key={href} href={`/admin/${href}`}>
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}