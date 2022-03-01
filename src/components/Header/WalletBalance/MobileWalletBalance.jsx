import * as styles from "./css/MobileWalletBalance.module.css";

const MobileWalletBalance = ({ balance }) => {
  return (
    <div className={styles.balance}>
      <h3 className={styles.text}>Balance: {balance}</h3>
    </div>
  );
};

export default MobileWalletBalance;
