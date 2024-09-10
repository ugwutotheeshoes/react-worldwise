/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useReducer } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { firebaseConfig } from "../hooks/firebase";

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const UserContext = createContext();

const initialState = {
  users: "",
  isLoading: false,
  errorMessage: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "user/loaded":
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    case "user/created":
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    case "user/created-google":
      return {
        ...state,
        isLoading: false,
        users: "Google User created",
      };
    case "user/reset":
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    case "error/reset":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    case "auth/weak-password":
      return {
        ...state,
        isLoading: false,
        errorMessage:
          "The password is too weak. Password should be at least 6 characters",
      };
    case "auth/email-already-in-use":
      return {
        ...state,
        isLoading: false,
        errorMessage:
          "This email address is already in use by another account.",
      };
    case "auth/invalid-credential":
      return {
        ...state,
        isLoading: false,
        errorMessage:
          "This credential is invalid. Sign up with your email address.",
      };
    default:
      break;
  }
}

function UsersProvider({ children }) {
  const [{ isLoading, users, errorMessage }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const auth = getAuth(app);
  async function createUser(newUser) {
    dispatch({ type: "loading" });
    await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          console.log(user);
          dispatch({ type: "user/created", payload: "User created" });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        dispatch({
          type: errorCode,
        });
      });
  }
  async function googleSignUp() {
    dispatch({ type: "loading" });
    try {
      // Sign in with a pop-up window
      const result = await signInWithPopup(auth, provider);
      // Pull signed-in user credential.
      const user = result.user;
      if (user) {
        console.log(user);
        console.log(user.displayName);
        dispatch({
          type: "user/created-google",
        });
      }
    } catch (error) {
      // Handle errors here.
      const errorCode = error.code;
      if (error) {
        dispatch({
          type: `${errorCode}`,
        });
      }
    }
  }
  async function resetUser() {
    dispatch({ type: "loading" });
    try {
      dispatch({ type: "user/reset", payload: "" });
      dispatch({ type: "error/reset", payload: "" });
    } catch (error) {
      const errorCode = error.code;
      if (error) {
        dispatch({
          type: `${errorCode}`,
        });
      }
    }
  }
  async function getUser(user) {
    dispatch({ type: "loading" });
    await signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          console.log(user);
          dispatch({ type: "user/loaded", payload: "Successfully Logged in" });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (error) {
          dispatch({
            type: `${errorCode}`,
          });
        }
      });
  }
  return (
    <UserContext.Provider
      value={{
        users,
        isLoading,
        googleSignUp,
        getUser,
        createUser,
        resetUser,
        errorMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUsers() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("UsersContext was used outside the UsersProvider");
  return context;
}

export { UsersProvider, useUsers };
