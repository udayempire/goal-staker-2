"use client"
import { GoalForm } from "@/components/GoalForm";
import MainLayout from "../mainLayout";
import { useWalletAddress } from "@/hooks/useWalletAddress";
export default function CreateGoal() {
    const address = useWalletAddress();
    console.log(address);
    return (
        <MainLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Create a New Goal</h1>
                <GoalForm />
            </div>
        </MainLayout>
    );
}
