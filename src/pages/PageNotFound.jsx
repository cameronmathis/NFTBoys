import * as styles from "./css/PageNotFound.module.css";

function PageNotFound() {
  return (
    <div className={styles.container}>
      <body className={styles.body}>
        <p className={styles.title}>Page Not Found</p>
        <p className={styles.text}>Sorry, the requested page was not found.</p>
      </body>
    </div>
  );
}

export default PageNotFound;
