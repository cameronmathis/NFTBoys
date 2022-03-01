import * as styles from "./css/ComputerWalletBalance.module.css";

const ComputerWalletBalance = ({ balance }) => {
  return (
    <div className={styles.balance}>
      <h3 className={styles.text}>Your Balance: {balance}</h3>
    </div>
  );
};

export default ComputerWalletBalance;
