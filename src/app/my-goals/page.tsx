"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { MyGoalsCard } from "@/components/MyGoalsCard";
import MainLayout from "../mainLayout";
import { useWalletAddress } from "@/hooks/useWalletAddress";

export default function MyGoals() {
  const address = useWalletAddress();
  const [createdGoals, setCreatedGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!address) return;

    axios
      .get(`http://localhost:3000/api/groups/check-membership?walletAddress=${address}`)
      .then((response) => {
        const data = response.data.data;
        // Extract the created goals
        setCreatedGoals(data.created.goals || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching membership data", err);
        setError("Error fetching data");
        setLoading(false);
      });
  }, [address]);

  if (loading) {
    return (
      <MainLayout>
        <div>Loading...</div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div>{error}</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div>
        <div className="w-full flex justify-between p-4 items-center">
          <h1 className="text-zinc-200 text-2xl mb-4">My Goals</h1>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {createdGoals.length > 0 ? (
            createdGoals.map((goal) => (
              <MyGoalsCard
                key={goal.goalId}
                title={goal.goalTitle}
                description={goal.description}
                stakeAmount={goal.stakeAmount}
                details={`/full-goal/${goal.goalId}`}
              />
            ))
          ) : (
            <p className="text-white">No goals found.</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

