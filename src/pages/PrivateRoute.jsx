/* eslint-disable no-unused-vars */
// import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_PROJECT_URL,
  process.env.REACT_APP_SUPABASE_CLIENT_API_KEY
);
// import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
  // const { user } = useAuth0();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  }
  // } else {
  // if (!user) {
  //   return <Navigate to="/" />;
  // }
  return children;
};
export default PrivateRoute;
