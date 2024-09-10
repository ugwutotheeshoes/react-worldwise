import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useLayout } from "../contexts/LayoutContext";
import { useUsers } from "../contexts/UserContext";

const Side = () => {
  const { closeSideTab, sideTab } = useLayout();
  const { users } = useUsers();

  return (
    sideTab && (
      <div className="h-[100%] bg-[#fff] text-[rgb(36,42,46)] pt-14 px-20 pl-32 absolute right-0 top-0 min-[1024px]:hidden">
        <button
          onClick={closeSideTab}
          className="float-right pb-20 pl-40 text-4xl"
        >
          <FaTimes />
        </button>
        <ul className="space-y-10 text-3xl font-semibold text-right uppercase">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/product">Product</NavLink>
          </li>
          {!users && (
            <li>
              <NavLink to="/login">Log In</NavLink>
            </li>
          )}
        </ul>
      </div>
    )
  );
};

export default Side;
