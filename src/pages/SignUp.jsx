/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import { useUsers } from "../contexts/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import LoginNav from "../components/LoginNav";
import Toast from "./Toast";
import { FaTimes } from "react-icons/fa";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const { createUser, errorMessage, users } = useUsers();

  async function handleSubmit(e) {
    e.preventDefault();
    setUser({ email: email, password: password });
    await createUser(user);
    setEmail("");
    setPassword("");
  }

  if (users) {
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  }

  useEffect(() => {
    setUser({ email: email, password: password });
  }, [email, password]);
  return (
    <main className={styles.login}>
      <PageNav />
      {users && (
        <Toast message={users} type="success">
          <FaTimes />
        </Toast>
      )}
      {errorMessage && (
        <Toast message={errorMessage} type="error">
          <FaTimes />
        </Toast>
      )}
      <div className="my-[7%] mx-[5%] max-[1024px]:py-[7%]">
        <LoginNav />

        <form
          className={`${styles.form} min-[1024px]:w-[65%]`}
          onSubmit={handleSubmit}
        >
          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div>
            <Button type="primary">Sign Up</Button>
          </div>
          <span className="text-xl">
            Have an account?{" "}
            <span className="text-green-400">
              <NavLink to="/login">Log in</NavLink>
            </span>
          </span>
        </form>
      </div>
    </main>
  );
}
