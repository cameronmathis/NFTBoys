import React from "react";

import useStore from "../../Store";
import * as styles from "./css/Header.module.css";
import Menu from "./Menu/Menu";
import WalletBalance from "./WalletBalance/WalletBalance";

const Header = () => {
  const isMobile = useStore((state) => state.isMobile);

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.title}>NFTBoys</h1>
        {isMobile ? null : (
          <>
            <p className={styles.spacer}></p>
            <WalletBalance />
          </>
        )}
      </div>
      <div className={styles.right}>
        <Menu />
      </div>
    </div>
  );
};

export default Header;
