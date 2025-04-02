import Link from "next/link";

interface GoalsCardProps {
    title: string;
    description: string;
    stakeAmount: string;
    details?: string | null;
}

export const GoalsCard = ({ title, description, stakeAmount, details }: GoalsCardProps) => {
    return (
        <div className="bg-blue-950 text-white rounded-2xl p-6 shadow-lg relative">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">{title}</h1>
                <div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                    {stakeAmount}
                </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <p className="text-gray-300 text-sm">
                    {description}
                </p>
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
    );
};
