import React from "react";

import { FOOTER_ITEMS } from "../../constants/FooterItems";
import * as styles from "./css/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      {FOOTER_ITEMS.map((item) => (
        <a className={styles.item} target="blank" href={item.link}>
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default Footer;
