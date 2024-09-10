/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import { useUsers } from "../contexts/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import LoginNav from "../components/LoginNav";
import { FaGoogle, FaTimes } from "react-icons/fa";
import Toast from "./Toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const { users, getUser, googleSignUp, errorMessage } = useUsers();

  async function handleSubmit(e) {
    e.preventDefault();
    await getUser(user);
    setEmail("");
    setPassword("");
  }

  useEffect(() => {
    if (users) navigate("/app/cities");
  }, [users]);

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
            <Button type="primary">Log in</Button>
          </div>
          <div className={styles.loginContainer}>
            <button
              onClick={googleSignUp}
              className="flex items-center justify-center gap-3 text-2xl bg-[#00c46a] p-2.5 text-black font-semibold rounded-md"
            >
              <span>
                <FaGoogle />
              </span>
              <span>Sign Up with Google</span>
            </button>
            <span className="text-2xl">
              Don&apos;t have an account?{" "}
              <span className="text-green-400">
                <NavLink to="/signup">Sign Up</NavLink>
              </span>
            </span>
          </div>
        </form>
      </div>
    </main>
  );
}
