"use client";
import { useState } from "react";

export const GoalForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        rules: "",
        participants: "",
        stakeAmount: "",
        registrationDate: "",
        endDate: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Convert the rules textarea value into an array (split by newlines)
        const rulesArray = formData.rules
            .split("\n")
            .map((rule) => rule.trim())
            .filter((rule) => rule.length > 0);
        const finalData = {
            title: formData.title,
            description: formData.description,
            rules: rulesArray,
            participants: Number(formData.participants),
            stakeAmount: formData.stakeAmount,
            registrationDate: formData.registrationDate,
            endDate: formData.endDate,
        };
        console.log("Submitted Goal Data:", finalData);
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
                    name="title"
                    value={formData.title}
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
                        name="registrationDate"
                        value={formData.registrationDate}
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
