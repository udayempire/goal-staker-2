"use client";
import { useState } from "react";

export const GoalFullCardForm = () => {
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
      className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter goal title"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter goal description"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">
          Rules (one per line):
        </label>
        <textarea
          name="rules"
          value={formData.rules}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter each rule on a new line"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">
          Participants:
        </label>
        <input
          type="number"
          name="participants"
          value={formData.participants}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter number of participants"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">
          Stake Amount:
        </label>
        <input
          type="text"
          name="stakeAmount"
          value={formData.stakeAmount}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter stake amount (e.g. ₹50)"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">
          Registration Date:
        </label>
        <input
          type="date"
          name="registrationDate"
          value={formData.registrationDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit Goal Data
      </button>
    </form>
  );
};
