import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { useLayout } from "../contexts/LayoutContext";

function PageNav() {
  const { openSideTab } = useLayout();

  return (
    <nav
      className={`${styles.nav} flex justify-between items-center pt-12 px-10`}
    >
      {/* <button>
        <FaUser />
      </button> */}
      <Logo />
      <ul className="flex justify-between items-center gap-40 text-3xl font-semibold max-[1024px]:hidden">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li className="flex justify-center items-center gap-3">
          <NavLink to="/login">
            <span className="text-6xl">
              <FaUserCircle />
            </span>
          </NavLink>
        </li>
      </ul>
      <button onClick={openSideTab} className="min-[1024px]:hidden text-3xl">
        <FaBars />
      </button>
    </nav>
  );
}

export default PageNav;
