import React from "react";
import styles from "./styles.scss";

const Page = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default Page;
