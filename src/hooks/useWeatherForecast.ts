import { useState } from "react";
import type { Weather } from "../types";
import { formatToBrasiliaTime, getDayNames } from "../utils";

export const useWeatherForecast = (weather: Weather) => {
  const [selectedDay, setSelectedDay] = useState(0);

  const handleDayClick = (index: number) => setSelectedDay(index);

  const dayNames = getDayNames(weather);

  const sunriseTime = formatToBrasiliaTime(
    weather.forecast.forecastday?.[selectedDay]?.astro?.sunrise || ""
  );
  const sunsetTime = formatToBrasiliaTime(
    weather.forecast.forecastday?.[selectedDay]?.astro?.sunset || ""
  );

  return {
    selectedDay,
    handleDayClick,
    dayNames,
    sunriseTime,
    sunsetTime
  };
};