"use client";
import { useState } from "react";
import axios from "axios";
import { useWalletAddress } from "@/hooks/useWalletAddress";
export const GoalForm = () => {
    const address = useWalletAddress();
    const [formData, setFormData] = useState({
        goalTitle: "",
        description: "",
        rules: "",
        stakeAmount: "",
        startDate: "",
        endDate: "",
        walletAddress: ""
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const finalData = {
            goalTitle: formData.goalTitle,
            description: formData.description,
            rules: formData.rules, // Keep rules as a single string
            stakeAmount: formData.stakeAmount,
            startDate: formData.startDate,
            endDate: formData.endDate,
            walletAddress: address
        };
        try {
            const response = await axios.post("http://localhost:3000/api/goals", finalData);
            console.log("Goal created successfully:", response.data);
            alert("Goal created successfully!");
        } catch (error) {
            console.error("Error creating goal:", error);
            alert("Failed to create goal.");
        }
        alert("Goal data submitted. Check the console for details.");
    };
    

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full p-6 bg-blue-950 rounded-lg shadow-md"
        >
            <div className="mb-4 flex flex-col gap-2">
                <label className="block text-zinc-300 font-semibold">Title:</label>
                <input
                    type="text"
                    name="goalTitle"
                    value={formData.goalTitle}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-2  rounded bg-zinc-300 text-black placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter goal title"
                    required
                />
            </div>
            <div className="mb-4 flex flex-col gap-2">
                <label className="block text-zinc-300 font-semibold">Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded resize-none border-indigo-950 bg-zinc-300 text-black placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 "
                    placeholder="Enter goal description"
                    required
                ></textarea>
            </div>
            <div className="mb-4 flex flex-col gap-2">
                <label className="block text-zinc-300 font-semibold">
                    Rules (one per line):
                </label>
                <textarea
                    name="rules"
                    value={formData.rules}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded resize-none border-indigo-950 bg-zinc-300 text-black placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter each rule on a new line"
                    required
                ></textarea>
            </div>
            <div className="mb-4 flex justify-between">

                <div className="mb-4 flex flex-col gap-2">
                    <label className="block text-zinc-300 font-semibold">
                        Stake Amount:
                    </label>
                    <input
                        type="text"
                        name="stakeAmount"
                        value={formData.stakeAmount}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-indigo-950 rounded bg-zinc-300 text-black placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter stake amount"
                        required
                    />
                </div>
                <div className="mb-4 flex flex-col gap-2">
                    <label className="block text-zinc-300 font-semibold">
                        Registration Date:
                    </label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-indigo-950 rounded bg-zinc-300 text-black placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                </div>
                <div className="mb-4 flex flex-col gap-2">
                    <label className="block text-zinc-300 font-semibold">End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-indigo-950 rounded bg-zinc-300 text-black placeholder:text-zinc-500"
                        required
                    />
                </div>
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-zinc-300 px-4 py-2 rounded hover:bg-blue-700 transition w-full"
            >
                Create Goal
            </button>
        </form>
    );
};
