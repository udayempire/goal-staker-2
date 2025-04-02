'use client';

import ClientCard from './ClientCard';

export default function DashboardCard() {
    return (
        <ClientCard 
            className="bg-gray-800 text-white w-full"
            title="Welcome to Stake2Achieve"
            subtitle="Your personal achievement tracking platform"
            showFooterButton={true}
            footerButtonText="View Details"
            price={999}
            onFooterButtonClick={() => {
                // Add your click handler here
                console.log("Button clicked");
            }}
        >
            <p className="text-gray-300">
                Track your goals, set stakes, and achieve more with our platform.
            </p>
        </ClientCard>
    );
} 