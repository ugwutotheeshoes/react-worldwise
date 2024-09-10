/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styles from "./Toast.module.css";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { useUsers } from "../contexts/UserContext";

function Toast({ icon, type, children, message }) {
  const { resetUser } = useUsers();
  const [show, setShow] = useState(false);
  const duration = 3000;
  useEffect(() => {
    if (message) {
      setShow(true);

      const timer = setTimeout(() => {
        setShow(false);
        resetUser(); // Reset user after toast disappears if type is "error"
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, resetUser]);

  if (!show) return null;

  const handleToast = () => {
    setShow(false);
  };
  return (
    <div
      className={`${styles.toast} flex justify-between items-center mx-[30%] text-xl bg-white text-black p-4 rounded-md 
 
         `}
    >
      <span className={`${styles[type]} text-3xl`}>
        {type === "success" && <FaRegCheckCircle />}

        {type === "error" && <FaRegTimesCircle />}
      </span>
      <p className="px-[1rem] text-center">{message}</p>
      <button onClick={handleToast} className={`${styles.alert} text-3x`}>
        {children}
      </button>
    </div>
  );
}

export default Toast;
