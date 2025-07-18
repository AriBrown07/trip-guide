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
          to="/mir"
          color="inherit"
          variant={location.pathname === "/mir" ? "outlined" : "text"}
        >
          Mir
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
          to="/brest"
          color="inherit"
          variant={location.pathname === "/brest" ? "outlined" : "text"}
        >
          Brest
        </Button>
        <Button
          component={Link}
          to="/sophia"
          color="inherit"
          variant={location.pathname === "/sophia" ? "outlined" : "text"}
        >
          Sophia
        </Button>
        <Button
          component={Link}
          to="/naroch"
          color="inherit"
          variant={location.pathname === "/naroch" ? "outlined" : "text"}
        >
          Naroch
        </Button>
        <Button
          component={Link}
          to="/palace"
          color="inherit"
          variant={location.pathname === "/palace" ? "outlined" : "text"}
        >
          Palace
        </Button>
        <Button
          component={Link}
          to="/hatyn"
          color="inherit"
          variant={location.pathname === "/hatyn" ? "outlined" : "text"}
        >
          Hatyn
        </Button>
        <Button
          component={Link}
          to="/pushcha"
          color="inherit"
          variant={location.pathname === "/pushcha" ? "outlined" : "text"}
        >
          Pushcha
        </Button>


      </Toolbar>
    </AppBar>
  );
};

export { Navbar };
