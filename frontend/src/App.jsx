import { createContext, useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import { jwtDecode } from "jwt-decode";
import { DateTime } from "luxon";

export const UserContext = createContext(null);

const App = () => {
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    const checkJWTToken = async () => {
      const token = localStorage.getItem("token");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${String(localStorage.getItem("token"))}`,
        },
      };
      if (token) {
        const decoded = jwtDecode(localStorage.getItem("token"));
        const tokenExpirationDate = DateTime.fromSeconds(decoded.exp);
        const currentDate = DateTime.fromMillis(Date.now());

        if (currentDate > tokenExpirationDate) {
          console.log("token expired");
          localStorage.clear();
          return;
        }

        const response = await fetch("http://localhost:8080/", options);
        const data = await response.json();

        setUserObject(data);

        return data;
      }
    };
    checkJWTToken();
  }, []);

  return (
    <>
      <UserContext.Provider value={{ userObject, setUserObject }}>
        <NavBar />
        <Outlet />
      </UserContext.Provider>
    </>
  );
};

export default App;
