import { createContext, useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";

export const UserContext = createContext(null);

const App = () => {
  const [userObject, setUserObject] = useState({
    username: "",
    password: "",
  });
  console.log(userObject);

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
