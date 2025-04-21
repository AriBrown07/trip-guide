import React from "react";
import { Paper, Typography } from "@mui/material";
import styles from "./Home.module.scss";

const Home: React.FC = () => {
  return (
    <Paper className={styles.container}>
      <Typography variant="h4">🏠 Home</Typography>

      <Typography>Welcome to Trip Guide!</Typography>
    </Paper>
  );
};

export { Home };
