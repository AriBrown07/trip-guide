import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  CircularProgress,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import styles from "./Weather.module.scss";

interface WeatherForecast {
  date: string;
  temperatureC: number;
  summary: string;
}

const Weather: React.FC = () => {
  const [data, setData] = useState<WeatherForecast[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch("https://localhost:7039/WeatherForecast");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <Paper className={styles.container} elevation={3}>
      <Typography variant="h4" gutterBottom>
        🌤 Weather Information
      </Typography>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {data && (
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid key={index}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6">
                    📅 {new Date(item.date).toLocaleDateString()}
                  </Typography>

                  <Typography variant="body1">
                    🌡 {item.temperatureC}°C
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    📝 {item.summary}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );
};

export { Weather };
