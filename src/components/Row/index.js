import React from "react";
import styles from "./styles.scss";

const Row = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default Row;
