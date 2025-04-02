"use client";
import { useState } from "react";
import Link from "next/link";

interface GoalValidationCardProps {
  title: string;
  description: string;
  stakeAmount: string;
  proofLink: string;
}

export const GoalValidationCard = ({
  title,
  description,
  stakeAmount,
  proofLink,
}: GoalValidationCardProps) => {
  const [voted, setVoted] = useState(false);
  const [vote, setVote] = useState<"yes" | "no" | "">("");

  const handleVote = (voteChoice: "yes" | "no") => {
    if (voted) return;
    setVoted(true);
    setVote(voteChoice);
    alert(`You voted ${voteChoice.toUpperCase()}!`);
  };

  return (
    <div className="bg-blue-950 text-zinc-200 rounded-2xl p-6 shadow-lg relative">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{title}</h1>
          <div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
            {stakeAmount}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-zinc-300 text-sm">{description}</p>
        </div>
        <div className="mt-4">
          <p className="text-zinc-300 text-sm">Proof:</p>
          <Link
            href={proofLink}
            className="text-blue-300 underline hover:text-blue-400"
          >
            {proofLink}
          </Link>
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => handleVote("yes")}
          disabled={voted}
          className={`w-full px-4 py-2 rounded transition ${
            voted ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          } text-white`}
        >
          Yes
        </button>
        <button
          onClick={() => handleVote("no")}
          disabled={voted}
          className={`w-full px-4 py-2 rounded transition ${
            voted ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          } text-white`}
        >
          No
        </button>
      </div>
      {voted && (
        <div className="mt-4 text-center text-zinc-300 text-sm">
          <p>You voted: <span className="font-semibold">{vote.toUpperCase()}</span></p>
        </div>
      )}
    </div>
  );
};
