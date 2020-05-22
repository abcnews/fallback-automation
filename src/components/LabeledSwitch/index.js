import React from "react";
import styles from "./styles.scss";
import Switch from "react-switch";

export const LabeledSwitch = props => {
  return (
    <label htmlFor={props.id}>
      <div>{props.label}</div>
      <Switch {...props} />
    </label>
  );
};
