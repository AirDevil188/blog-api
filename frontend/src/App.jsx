import { useEffect, useState } from "react";
import "./App.css";
import { fetchData } from "../helper/fetchData";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
