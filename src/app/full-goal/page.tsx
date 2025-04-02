import { GoalFullCard,GoalFullCardProps } from "@/components/GoalFullCard";
import MainLayout from "../mainLayout";

const goalData: GoalFullCardProps = {
    title: "Leetcode Grind Challenge",
    description: "Solve 5 questions minimum daily on Leetcode for 10 continuous days.",
    rules: ["Solve 5 questions each day", "Share your Leetcode profile URL"],
    participants: 123,
    stakeAmount: "₹50",
    registrationDate: "10th April 2025",
    endDate: "20th April 2025"
};

export default function Goal() {

    return (
        <MainLayout>
            <GoalFullCard {...goalData} />
        </MainLayout>
    );
}
