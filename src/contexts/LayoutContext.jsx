/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useReducer } from "react";

const LayoutContext = createContext();

const initialState = {
  sideTab: false,
  cityTab: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "city_tab/open":
      return {
        ...state,
        cityTab: true,
      };
    case "city_tab/close":
      return {
        ...state,
        cityTab: false,
      };
    case "side_tab/open":
      return {
        ...state,
        sideTab: true,
      };
    case "side_tab/close":
      return {
        ...state,
        sideTab: false,
      };
    default:
      return state;
  }
}

function LayoutProvider({ children }) {
  const [{ cityTab, sideTab, layout }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function openCityTab() {
    dispatch({ type: "city_tab/open" });
  }
  async function closeCityTab() {
    dispatch({ type: "city_tab/close" });
  }
  async function openSideTab() {
    dispatch({ type: "side_tab/open" });
  }
  async function closeSideTab() {
    dispatch({ type: "side_tab/close" });
  }
  return (
    <LayoutContext.Provider
      value={{
        cityTab,
        sideTab,
        openSideTab,
        closeSideTab,
        openCityTab,
        closeCityTab,
        layout,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { LayoutProvider, useLayout };
