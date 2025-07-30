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
          to="/map"
          color="inherit"
          variant={location.pathname === "/" ? "outlined" : "text"}
        >

          Map
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

        <Button
          component={Link}
          to="/test"
          color="inherit"
          variant={location.pathname === "/test" ? "outlined" : "text"}
        >
          Test
        </Button>

        <Button
          component={Link}
          to="/kolas"
          color="inherit"
          variant={location.pathname === "/kolas" ? "outlined" : "text"}
        >
          Kolas
        </Button>
        <Button
          component={Link}
          to="/polock"
          color="inherit"
          variant={location.pathname === "/polock" ? "outlined" : "text"}
        >
          Polock
        </Button>
        <Button
          component={Link}
          to="/nesvizh"
          color="inherit"
          variant={location.pathname === "/nesvizh" ? "outlined" : "text"}
        >
          Nesvizh
        </Button>
        <Button
          component={Link}
          to="/pushcha"
          color="inherit"
          variant={location.pathname === "/pushcha" ? "outlined" : "text"}
        >
          Pushcha
        </Button>
        <Button
          component={Link}
          to="/kupalle"
          color="inherit"
          variant={location.pathname === "/kupalle" ? "outlined" : "text"}
        >
          Kupalle
        </Button>

      </Toolbar>
    </AppBar>
  );
};

export { Navbar };
