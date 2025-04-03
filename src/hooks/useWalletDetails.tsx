import { useWalletBalance } from "thirdweb/react";
import { useWalletAddress } from "./useWalletAddress";

interface WalletDetails {
  address: string | undefined;
  balance: ReturnType<typeof useWalletBalance>["data"];
  isLoading: boolean;
}

export function useWalletDetails(client: any, chain: any): WalletDetails {
  const address = useWalletAddress();
  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain,
    address,
  });
  return { address, balance, isLoading };
}
