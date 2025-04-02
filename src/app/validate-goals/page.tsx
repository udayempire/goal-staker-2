import { GoalValidationCard } from "@/components/GoalValidationCard";
import MainLayout from "../mainLayout"

export default function ValidateGoals() {
    return (
        <MainLayout>
            <div>
                <h1 className="text-white text-2xl mb-4">Validate Goals</h1>
                <p className="text-white">Validate Goals Page</p>
            </div>
            <div className="mt-4 flex flex-col gap-4">
                <GoalValidationCard title="LeetCode Grind Quest" description="Complete 5 Leetcode Questions Daily" stakeAmount="0.01ETH" proofLink="https://udayempire.tech"/>
                <GoalValidationCard title="LeetCode Grind Quest" description="Complete 5 Leetcode Questions Daily" stakeAmount="0.01ETH" proofLink="https://udayempire.tech"/>
            </div>

        </MainLayout>
    );
}
