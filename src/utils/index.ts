import { format, parse } from "date-fns";
import type { HourEntity, Weather } from "../types";

const DIAS = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

export const getDayNames = (weather: any) => {
  return weather.forecast.forecastday.map((e: any) => {
    const data = new Date(e.date);
    const diaDaSemana = data.getDay();
    return DIAS[diaDaSemana];
  });
};

export const formatToBrasiliaTime = (timeString: string) => {
  return format(parse(timeString, "h:mm a", new Date()), "HH:mm");
};

export const getCurrentDayData = (
  weather: Weather,
  index: number,
  dataType: keyof Pick<HourEntity, "chance_of_rain" | "wind_kph" | "humidity">
) => {
  return (
    weather.forecast.forecastday?.[index]?.hour?.map(
      (hourData: HourEntity) => hourData[dataType]
    ) || []
  );
};