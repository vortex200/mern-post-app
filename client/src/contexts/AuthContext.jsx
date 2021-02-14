import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import SetHeaders from "Utils/SetHeaders";
import http from "Utils/http-common";

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
    http
      .get("/api/user/auth", SetHeaders())
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

  const logout = (cb) => {
    http
      .get("/api/user/logout", SetHeaders())
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("authToken");
          cb(null);
        } else {
          cb("bad response status");
        }
      })
      .catch((err) => {
        console.log(err);
        cb(err);
      });
  };

  return (
    <AuthContext.Provider value={{ state, logout }}>
      {input.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
