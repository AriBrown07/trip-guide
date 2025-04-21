import React from "react";
import { Container } from "@mui/material";
import { AppRoutes } from "./routes/AppRoutes";
import { Navbar } from "./components/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <>
      <Navbar />

      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <AppRoutes />
      </Container>
    </>
  );
};

export { App };
