import { GoalsCard } from "@/components/GoalsCard";
import MainLayout from "../mainLayout"
import Link from "next/link";
import axios from "axios";
export default function Groups() {
    return (
        <MainLayout>
            <div>
                <div className="w-full flex justify-between p-4 items-center">
                    <h1 className="text-zinc-200 text-2xl mb-4">Goals Group</h1>
                    <Link href={"/create-goal"} className="text-white text-2xl mb-4 bg-blue-950 p-4 rounded-2xl">Create Goal</Link>
                </div>
                {/* <p className="text-white">Groups page</p> */}
                <div className="mt-4 flex flex-col gap-4">
                    <GoalsCard title="Leetcode Grind Quest" description="Complete 5 Questions on Leetcode Daily" stakeAmount="0.001 ETH" details="/dashboard" />
                    <GoalsCard title="Leetcode Grind Quest" description="Complete 5 Questions on Leetcode Daily" stakeAmount="0.001 ETH" details="/dashboard" />
                    <GoalsCard title="Leetcode Grind Quest" description="Complete 5 Questions on Leetcode Daily" stakeAmount="0.001 ETH" details="/dashboard" />
                    <GoalsCard title="Leetcode Grind Quest" description="Complete 5 Questions on Leetcode Daily" stakeAmount="0.001 ETH" details="/dashboard" />
                </div>
            </div>
        </MainLayout>
    );
}
