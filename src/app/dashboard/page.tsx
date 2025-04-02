import { StatsOverview } from "../components/ui/StatsOverview";
import MainLayout from "../mainLayout";
import DashboardCard from "../components/DashboardCard";

export default function Dashboard() {
    return (
        <MainLayout >
            <div>
                <h1 className="text-white text-2xl mb-4">Dashboard Home</h1>
                <StatsOverview />
                <div className="max-w-6xl mx-auto mt-8">
                    <DashboardCard />
                </div>
            </div>
        </MainLayout>
    );
}
