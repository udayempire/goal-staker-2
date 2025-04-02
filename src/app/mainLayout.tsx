import Sidebar from "@/components/Sidebar";
import { Appbar } from "@/components/ui/Appbar";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Appbar />
            <div className="flex">
                <Sidebar />
                <div className="bg-slate-900 w-full p-4" >{children}</div>
            </div>
        </div>
    );
}
