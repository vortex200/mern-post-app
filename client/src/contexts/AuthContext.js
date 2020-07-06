import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = (input) => {
  const [state, setState] = useState({
    isAuth: false,
    isLoading: true,
    user: {},
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const tokenConfig = () => {
      const token = localStorage.getItem("authToken");

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      if (token) {
        config.headers["x-auth-token"] = token;
      }

      return config;
    };

    axios
      .get(process.env.REACT_APP_API_URL + "/api/user/auth", tokenConfig())
      .then((res) => {
        if (res.status === 200) {
          setState({
            isAuth: true,
            isLoading: false,
            user: res.data.user,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setState({
          isAuth: false,
          isLoading: false,
          user: null,
        });
      });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ state, logout }}>
      {input.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
