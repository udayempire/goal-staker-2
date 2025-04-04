"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { GoalFullCard, GoalFullCardProps } from "@/components/GoalFullCard";
import MainLayout from "@/app/mainLayout";
import { useSearchParams } from "next/navigation";
export default function Goal() {
  const searchParams = useSearchParams();
  const id = searchParams.get("groupId");
  const [goalData, setGoalData] = useState<GoalFullCardProps | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/groups/${id}`)
      .then((response) => {
        const { group } = response.data;
        const goal = group.goalId;
        const formattedData: GoalFullCardProps = {
          goalTitle: goal.goalTitle,
          description: goal.description,
          rules: goal.rules,
          participants: group.participantCount,
          stakeAmount: goal.stakeAmount,
          // Optionally format the date if needed
          startDate: new Date(goal.startDate).toLocaleDateString(),
          endDate: new Date(goal.endDate).toLocaleDateString(),
        };
        setGoalData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching group data:", error);
      });
  }, []);

  if (!goalData) {
    return (
      <MainLayout>
        <div>Loading...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <GoalFullCard {...goalData} />
    </MainLayout>
  );
}
