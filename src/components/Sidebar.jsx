/* eslint-disable no-unused-vars */
import AppNav from "./AppNav";
import Logo from "./Logo";
import Footer from "./Footer";
import styles from "./Sidebar.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaBoxOpen, FaHome, FaUserCircle } from "react-icons/fa";
import { PiCityBold, PiCityLight, PiUserCircle } from "react-icons/pi";
import { RiPriceTag3Line, RiProductHuntLine } from "react-icons/ri";
import CitiesBar from "./CitiesBar";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useLayout } from "../contexts/LayoutContext";

function Sidebar() {
  const {openCityTab, cityTab} = useLayout()

  const [loading, setLoading] = useState(false);
  const [lat, lng] = useUrlPosition();

  const citiesToggle = () => {
    setLoading(!loading);
  };

  // if (lat && lng) return <CitiesBar />;
  return (
    <>
      <div className={`${styles.sidebar} max-[1024px]:hidden`}>
        <Logo />
        <AppNav />
        <Outlet />
        <Footer />
      </div>

      {cityTab ? (
        <CitiesBar />
      ) : (
        <div className="min-[1024px]:hidden w-32 bg-[#2d3439] text-center py-24 flex flex-col gap-16 items-center">
          <button
            onClick={openCityTab}
            className="text-4xl bg-[#00c46a] text-[#2d3439] p-4 rounded-full"
          >
            {/* <FaBars /> */}
            <PiCityBold />
          </button>
          <button className="text-5xl">
            <NavLink to="/">
              <FaHome />
            </NavLink>
          </button>
          <button className="text-5xl">
            <NavLink to="/pricing">
              <RiPriceTag3Line />
            </NavLink>
          </button>
          <button className="text-5xl">
            <NavLink to="/product">
              <FaBoxOpen />
            </NavLink>
          </button>
          <button className="text-5xl">
            <NavLink to="/login">
              <FaUserCircle />
            </NavLink>
          </button>
        </div>
      )}
    </>
  );
}

export default Sidebar;
