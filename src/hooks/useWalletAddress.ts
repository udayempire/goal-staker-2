import { useActiveAccount } from "thirdweb/react";

export function useWalletAddress(): string | undefined {
  const account = useActiveAccount();
  return account?.address;
}
