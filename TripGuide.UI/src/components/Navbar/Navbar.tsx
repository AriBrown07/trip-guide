import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import styles from "./Navbar.module.scss";

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        <Button
          component={Link}
          to="/Introductory"
          color="inherit"
          variant={location.pathname === "/Introductory" ? "outlined" : "text"}
        >
          Introductory
        </Button>
        <Button
          component={Link}
          to="/CountryIntro"
          color="inherit"
          variant={location.pathname === "/CountryIntro" ? "outlined" : "text"}
        >
          Country Introduction
        </Button>
        <Button
          component={Link}
          to="/"
          color="inherit"
          variant={location.pathname === "/" ? "outlined" : "text"}
        >
          Home
        </Button>
        <Button
          component={Link}
          to="/weather"
          color="inherit"
          variant={location.pathname === "/weather" ? "outlined" : "text"}
        >
          Weather
        </Button>


        <Button
          component={Link}
          to="/login"
          color="inherit"
          variant={location.pathname === "/login" ? "outlined" : "text"}
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/sign"
          color="inherit"
          variant={location.pathname === "/sign" ? "outlined" : "text"}
        >
          Sign in
        </Button>


      </Toolbar>
    </AppBar>
  );
};

export { Navbar };
