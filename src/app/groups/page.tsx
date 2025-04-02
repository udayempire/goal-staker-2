import { GoalsCard } from "@/components/GoalsCard";
import MainLayout from "../mainLayout"

export default function Groups() {
    return (
        <MainLayout>
            <div>
                <h1 className="text-white text-2xl mb-4">Goals Group</h1>
                {/* <p className="text-white">Groups page</p> */}
                <div className="mt-4">
                    <GoalsCard title="Leetcode Grind Quest" description="Complete 5 Questions on Leetcode Daily" stakeAmount="0.001 ETH" details="/dashboard"/>
                </div>
            </div>
        </MainLayout>
    );
}
