import { Box, Button, Drawer, Paper, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";

import useStore from "../../../Store";
import WalletBalance from "../WalletBalance/WalletBalance";
import * as styles from "./css/MobileMenu.module.css";

const MobileMenu = ({ menuItems, getRandomKey, handleClick }) => {
  const currentPage = useStore((state) => state.currentPage);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleMobileClick = (item) => {
    handleExpand();
    handleClick(item);
  };

  return (
    <div className={styles.menu}>
      <Button className={styles.menuIcon} onClick={handleExpand}>
        <MenuIcon
          className={isExpanded ? styles.expandedIcon : styles.closedIcon}
        />
      </Button>
      <Drawer
        anchor={"right"}
        open={isExpanded}
        onClose={() => setIsExpanded(false)}
      >
        <Paper square elevation={0} className={styles.drawer}>
          <WalletBalance />
          <p className={styles.spacer}></p>
          {menuItems?.map((item) => {
            return (
              <Box
                className={
                  currentPage == item.path ? styles.boxSelected : styles.box
                }
                key={getRandomKey(item.text)}
                onClick={() => handleMobileClick(item)}
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
        </Paper>
      </Drawer>
    </div>
  );
};

export default MobileMenu;
