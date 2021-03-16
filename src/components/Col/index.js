import React from "react";
import clsx from "clsx";
import styles from "./styles.scss";

const Col = ({ children, width }) => {
  return (
    <div className={clsx(styles.root, styles["wide-" + width])}>{children}</div>
  );
};

export default Col;
