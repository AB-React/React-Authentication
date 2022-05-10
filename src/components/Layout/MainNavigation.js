import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/auth-context";

import classes from "./MainNavigation.module.sass";

const MainNavigation = () => {
  const authCtx = React.useContext(AuthContext);
  // const navigate = useNavigate();

  const logoutHandler = (event) => {
    authCtx.logout();
    // navigate("/", { replace: true });
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authCtx.isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
