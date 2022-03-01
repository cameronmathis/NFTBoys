import { ethers } from "ethers";
import { useEffect, useState } from "react";

import useStore from "../../../Store";
import ComputerWalletBalance from "./ComputerWalletBalance";
import MobileWalletBalance from "./MobileWalletBalance";

function WalletBalance() {
  const currentUser = useStore((state) => state.currentUser);
  const isMobile = useStore((state) => state.isMobile);

  const walletBalanceProps = {
    balance: currentUser?.tokens,
  };

  return (
    <div>
      {isMobile ? (
        <MobileWalletBalance {...walletBalanceProps} />
      ) : (
        <ComputerWalletBalance {...walletBalanceProps} />
      )}
    </div>
  );
}

export default WalletBalance;
