"use client";
import { useRouter } from "next/navigation";

export interface GoalFullCardProps { 
    goalTitle: string;
    description: string;
    rules: string;
    participants: number;
    stakeAmount: string;
    startDate: string;
    endDate: string;
}

export const GoalFullCard = ({
    goalTitle,
    description,
    rules,
    participants,
    stakeAmount,
    startDate,
    endDate
}: GoalFullCardProps) => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const handleJoin = () => {
        alert("You have joined the goal!");
    };

    return (
        <div className="bg-blue-950 text-zinc-200 rounded-2xl p-6 shadow-lg w-full h-5xl">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">{goalTitle}</h1>
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                        Stake: {stakeAmount}
                    </div>
                </div>
                <p className="text-zinc-300">
                    {description}
                </p>
                <div className="mt-2">
                    <h2 className="text-xl font-semibold">Rules:</h2>
                    <ul className="list-disc list-inside text-zinc-300 space-y-1">
                        {rules}
                    </ul>
                </div>
                <div className="mt-4 space-y-1">
                    <p className="text-zinc-300">
                        Number of Participants: <span className="font-semibold">{participants}</span>
                    </p>
                    <p className="text-zinc-300">
                        Last Registration Date: <span className="font-semibold">{startDate}</span>
                    </p>
                    <p className="text-zinc-300">
                        End Date: <span className="font-semibold">{endDate}</span>
                    </p>
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
    );
};
