import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";

function LoginNav() {
  return (
    <div className={`${styles.nav} `}>
      <ul className="flex justify-center items-center">
        <li>
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
        <hr className={styles.hr} />
        <li>
          <NavLink to="/login">Log In</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default LoginNav;
