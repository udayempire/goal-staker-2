'use client'
import { GoalsCard } from "@/components/GoalsCard";
import MainLayout from "../mainLayout";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

interface Goal {
    goalId: {
        goalTitle: string;
        description: string;
        stakeAmount: string;
    };
    _id: string;
}

export default function Groups() {
    const [goals, setGoals] = useState<Goal[]>([]);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/groups");
                const fetchedGroups = response.data.groups || [];
                setGoals(Array.isArray(fetchedGroups) ? fetchedGroups : []);
                console.log("Fetched groups:", fetchedGroups);
            } catch (error) {
                console.error("Error fetching goals:", error);
            }
        };
        fetchGoals();
    }, []);

    return (
        <MainLayout>
            <div>
                <div className="w-full flex justify-between p-4 items-center">
                    <h1 className="text-zinc-200 text-2xl mb-4">Goals Group</h1>
                    <Link href={"/create-goal"} className="text-white text-2xl mb-4 bg-blue-950 p-4 rounded-2xl">
                        Create Goal
                    </Link>
                </div>
                <div className="mt-4 flex flex-col gap-4">
                    {goals.length > 0 ? (
                        goals.map((goal) => (
                            <GoalsCard
                                key={goal._id}
                                title={goal.goalId.goalTitle}
                                description={goal.goalId.description}
                                stakeAmount={goal.goalId.stakeAmount}
                                details={`/groups/${goal._id}`}
                            />
                        ))
                    ) : (
                        <p className="text-white">No goals available.</p>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
