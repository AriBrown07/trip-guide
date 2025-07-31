import React from "react";
import { Container } from "@mui/material";
import { AppRoutes } from "./routes/AppRoutes";
import { Navbar } from "./components/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <>

      
      <Container 
        maxWidth={false} 
        disableGutters // Отключает стандартные отступы 24px
        sx={{
          width: "100%", // На всякий случай явно указываем ширину
        }}
      >
        <AppRoutes />
      </Container>
    </>
  );
};

export { App };