"use client";

import { ConnectButton } from "thirdweb/react";
import { client } from "../../client"
export const Appbar = () => {
    return (
    <div className="">
        <header className="lg:flex lg:items-center lg:justify-between  bg-indigo-950 p-3 px-8">
            <div>
                <h1 className="text-2xl font-bold text-zinc-200 dark:text-white">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-300 dark:text-gray-400">Welcome back, track your goals and progress</p>
            </div>

            <div className="mt-4 lg:mt-0 flex space-x-3">
                          <ConnectButton
                            client={client}
                            appMetadata={{
                              name: "Example App",
                              url: "https://example.com",
                            }}
                          />
                {/* <button className="bg-zinc-100 text-zinc-800 hover:bg-zinc-200  px-4 py-2 rounded-lg transition duration-200 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"></path>
                    </svg>
                    Connect Wallet
                </button> */}
                {/* <button className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200">
                    Find Group
                </button> */}
            </div>
        </header>
    </div>
    )
}