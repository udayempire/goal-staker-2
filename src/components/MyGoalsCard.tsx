"use client";
import Link from "next/link";
import { useState } from "react";

interface MyGoalsCardProps {
  title: string;
  description: string;
  stakeAmount: string;
  details?: string | null;
}

export const MyGoalsCard = ({ title, description, stakeAmount, details }: MyGoalsCardProps) => {
  const [proofLink, setProofLink] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleMarkAsDone = () => {
    if (proofLink.trim() === "") {
      alert("Please enter the proof link before marking as done.");
      return;
    }
    setSubmitted(true);
    alert("Goal has been submitted as done!");
  };

  return (
    <div className="bg-blue-950 text-white rounded-2xl p-6 shadow-lg relative">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{title}</h1>
          <div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
            {stakeAmount}
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-gray-300 text-sm">{description}</p>
          {details && (
            <Link
              href={details}
              className="text-blue-300 text-sm underline hover:text-blue-400 ml-4"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-2 mt-3">
        <input
          type="text"
          name="proofLink"
          value={proofLink}
          onChange={(e) => setProofLink(e.target.value)}
          className="w-full px-3 py-2 border-2 rounded bg-zinc-300 text-black placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter Proof Link"
          required
        />
      </div>
      <button
        onClick={handleMarkAsDone}
        disabled={submitted}
        className={`w-full px-4 py-2 rounded transition ${
          submitted
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white`}
      >
        {submitted ? "Goal Submitted" : "Mark as Done"}
      </button>
    </div>
  );
};
