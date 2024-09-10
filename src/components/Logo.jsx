import { Link } from "react-router-dom";
// import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <img src="/logo.png" alt="WorldWise logo" className="max-[1024px]:h-14 lg:h-20" />
    </Link>
  );
}

export default Logo;
