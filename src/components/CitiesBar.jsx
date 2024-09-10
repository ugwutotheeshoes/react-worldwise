import AppNav from "./AppNav";
import Logo from "./Logo";
import Footer from "./Footer";
import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useLayout } from "../contexts/LayoutContext";

function CitiesBar({ citiesToggle }) {
  const { closeCityTab } = useLayout();
  return (
    <div className={`${styles.sidebar} min-[1024px]:hidden`}>
      <span className="flex justify-between items-center w-[100%] pb-4">
        <Logo />
        <button
          onClick={closeCityTab}
          className="min-[1024px]:hidden text-2xl bg-[#00c46a] text-[#2d3439] p-4 rounded-full"
        >
          <FaTimes />
        </button>
      </span>
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default CitiesBar;
