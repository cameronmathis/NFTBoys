import { Box, Typography } from "@material-ui/core";
import React from "react";

import useStore from "../../../Store";
import * as styles from "./css/ComputerMenu.module.css";

const ComputerMenu = ({ menuItems, getRandomKey, handleClick }) => {
  const currentPage = useStore((state) => state.currentPage);

  return (
    <div className={styles.menu}>
      {menuItems?.map((item) => {
        return (
          <Box
            className={
              currentPage == item.path ? styles.boxSelected : styles.box
            }
            key={getRandomKey(item.text)}
            onClick={() => handleClick(item)}
          >
            <Typography
              variant="inherit"
              className={
                currentPage == item.path ? styles.linkSelected : styles.link
              }
            >
              <h5>{item.text}</h5>
            </Typography>
          </Box>
        );
      })}
    </div>
  );
};

export default ComputerMenu;
