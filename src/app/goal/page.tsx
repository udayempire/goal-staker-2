"use client"
import MainLayout from "../mainLayout";
import { useRouter } from "next/navigation";

interface GoalCardProps {
    title: string;
    description: string;
    rules: string[];
    participants: number;
    registrationDate: string;
    endDate: string;
}

export default function Goal() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const handleJoin = () => {
        alert("You have joined the goal!");
    };

    return (
        <MainLayout>
            <div className="bg-blue-950 text-zinc-200 rounded-2xl p-6 shadow-lg w-full  ">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Task: Leetcode Grind Challenge</h1>
                    <p className="text-zinc-300">
                        Solve 5 questions minimum daily on Leetcode for 10 continuous days.s
                    </p>
                    <div className="mt-2">
                        <h2 className="text-xl font-semibold">Rules:</h2>
                        <ul className="list-disc list-inside text-zinc-300 space-y-1">
                            <li>Solve 5 questions each day</li>
                            <li>Share your Leetcode profile URL</li>
                        </ul>
                    </div>
                    <div className="mt-4">
                        <p className="text-zinc-300">Number of Participants: <span className="font-semibold">{123}</span></p>
                        <p className="text-zinc-300">Last Registration Date: <span className="font-semibold">10th April 2025</span></p>
                        <p className="text-zinc-300">End Date: <span className="font-semibold">20th April 2025</span></p>
                    </div>
                    <div className="flex gap-4 mt-6">
                        <button 
                            onClick={handleJoin} 
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            Join Goal
                        </button>
                        <button 
                            onClick={handleBack} 
                            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
