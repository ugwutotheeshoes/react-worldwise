import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useLayout } from "../contexts/LayoutContext";

const Side = () => {
  const { closeSideTab, sideTab } = useLayout();

  return (
    sideTab && (
      <div className="h-[100%] bg-[#fff] text-[rgb(36,42,46)] pt-14 px-20 pl-32 absolute right-0 top-0 min-[1024px]:hidden">
        <button
          onClick={closeSideTab}
          className="pb-20 float-right text-4xl pl-40"
        >
          <FaTimes />
        </button>
        <ul className="text-right text-3xl font-semibold uppercase space-y-10">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/product">Product</NavLink>
          </li>
          <li>
            <NavLink to="/login">Log In</NavLink>
          </li>
        </ul>
      </div>
    )
  );
};

export default Side;
