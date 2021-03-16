import React, { useEffect, useRef } from "react";
import styles from "./styles.scss";

const Modal = ({ children, isOpen, onRequestClose }) => {
  const rootRef = useRef();
  const handleOverlayClick = ev => {
    if (ev.target === rootRef.current) {
      console.log("onRequestClose :>> ", onRequestClose);
      onRequestClose();
    }
  };

  const handleEscape = ev => {
    if (ev.key === "Escape") onRequestClose();
  };

  useEffect(() => {
    console.log("isOpen :>> ", isOpen);
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    isOpen && (
      <div
        ref={rootRef}
        className={styles.backdrop}
        onClick={handleOverlayClick}
      >
        <div className={styles.container}>{children}</div>
      </div>
    )
  );
};

export default Modal;
