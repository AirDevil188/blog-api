import { useContext } from "react";
import { NavLink, useNavigation } from "react-router-dom";
import { UserContext } from "../App";
const NavBar = () => {
  const { userObject, setUserObject } = useContext(UserContext);

  const handleLoggingOut = () => {
    setUserObject({
      username: "",
      password: "",
    });
    localStorage.clear();
    useNavigation("/");
  };

  return (
    <header>
      <nav>
        <ul>
          <NavLink to={"/"}>
            <li>Homepage</li>
          </NavLink>
          <NavLink to={"/posts"}>
            <li>Blog</li>
          </NavLink>
          {!userObject ? (
            <>
              <NavLink to={"/log-in"}>
                <li>Log In</li>
              </NavLink>
              <NavLink to={"/sign-up"}>
                <li>Sign Up</li>
              </NavLink>
            </>
          ) : (
            <NavLink to={"/"} onClick={handleLoggingOut}>
              <li>Log-out</li>
            </NavLink>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
