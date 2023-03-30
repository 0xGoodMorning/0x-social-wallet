import { useState } from "react";

import { Wallet } from "ethers";
import { id } from "ethers/lib/utils";

import { fetchPost } from "@/helpers/fetch";
import useAccount from "@/hooks/useAccount";

export default function useCreateWallet() {
  const [err, setErr] = useState("");
  const [inProgress, setInProgress] = useState(false);

  const { updateAccount, resetAccount } = useAccount();

  const wrapProgress = async (fn, type = true) => {
    setInProgress(type);
    try {
      return await fn();
    } catch (e) {
      setAddAccErr(`Unexpected error: ${e.message || e}`);
    }
    setInProgress(false);
  };

  const wrapErr = async (fn) => {
    setAddAccErr("");
    try {
      await fn();
    } catch (e) {
      setInProgress(false);
      setAddAccErr(`Unexpected error: ${e.message || e}`);
    }
  };

  const resolveWallet = async ({
    socialHandle,
    socialHandleType = "twitter",
  }) => {
    setErr("");
    resetAccount();
    // async hack to let React run a tick so it can re-render before the blocking Wallet.createRandom()
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));

    const extraEntropy = id(
      `${socialHandle}:${Date.now()}:${Math.random()}:${
        typeof performance === "object" && performance.now()
      }`
    );
    const frontendKeyWallet = Wallet.createRandom({ extraEntropy });

    const frontendKeyAddress = frontendKeyWallet.address;

    const resolveWalletRes = await fetchPost(`api/resolve-wallet`, {
      frontendKeyAddress,
      socialHandle,
      socialHandleType,
    });

    if (!resolveWalletRes.address)
      throw new Error(
        `resolve-wallet returned no address, error: ${
          resolveWalletRes.message || resolveWalletRes
        }`
      );

    updateAccount({
      name: "Simeon",
      handle: "@sonytooo",
      address: "0xfA2DfB09851EeC1841FEB9f7c5D2E952151bfF0a",
      balance: 0,
      token: null,
    });

    console.log("resolveWalletRes: ", resolveWalletRes);

    return resolveWalletRes;
  };

  const handleResolveWallet = async ({ socialHandle, socialHandleType }) => {
    return await wrapProgress(
      () => resolveWallet({ socialHandle, socialHandleType }),
      true
    );
  };

  return { handleResolveWallet, wrapErr, wrapProgress, err, inProgress };
}
