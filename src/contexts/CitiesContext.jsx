/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useContext, useReducer } from "react";
import { citiesData } from "../hooks/data";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const currentCities = localStorage.getItem("cities");
        if (currentCities) {
          dispatch({
            type: "cities/loaded",
            payload: JSON.parse(currentCities),
          });
        } else {
          const res = citiesData.cities;
          localStorage.setItem("cities", JSON.stringify(res));
          const data = localStorage.getItem("cities");
          if (data) {
            dispatch({ type: "cities/loaded", payload: JSON.parse(data) });
          }
        }
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const cities = localStorage.getItem("cities");
      const res = JSON.parse(cities);
      const data = res.filter((city) => city.id === Number(id));
      dispatch({ type: "city/loaded", payload: data[0] });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading city...",
      });
    }
  }
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const cities = localStorage.getItem("cities");
      const res = JSON.parse(cities);
      const data = [...res, newCity];
      localStorage.setItem("cities", JSON.stringify(data));
      dispatch({ type: "city/created", payload: newCity });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city...",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const cities = localStorage.getItem("cities");
      const res = JSON.parse(cities);
      const data = res.filter((city) => city.id !== Number(id));
      localStorage.setItem("cities", JSON.stringify(data));
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
