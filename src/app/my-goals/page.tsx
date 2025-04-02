import { MyGoalsCard } from "@/components/MyGoalsCard";
import MainLayout from "../mainLayout"

export default function MyGoals() {
    return (
        <MainLayout>
            <div>
                <div className="w-full flex justify-between p-4 items-center">
                    <h1 className="text-zinc-200 text-2xl mb-4">My Goals</h1>
                </div>
                {/* <p className="text-white">Groups page</p> */}
                <div className="mt-4 flex flex-col gap-4">
                    <MyGoalsCard title="Leetcode Grind Quest" description="Complete 5 Questions on Leetcode Daily" stakeAmount="0.001 ETH" details="/dashboard" />
                    <MyGoalsCard title="Leetcode Grind Quest" description="Complete 5 Questions on Leetcode Daily" stakeAmount="0.001 ETH" details="/dashboard" />
                </div>
            </div>
        </MainLayout>
    );
}
