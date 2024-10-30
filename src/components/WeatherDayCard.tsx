import type { ForecastdayEntity } from "../types";

interface WeatherDayCardProps {
  index: number;
  selectedDay: number;
  dayName: string;
  dayForecast?: ForecastdayEntity;
  onClick: (index: number) => void;
  sunriseTime: string;
  sunsetTime: string;
}

export const WeatherDayCard = ({
  index,
  selectedDay,
  dayName,
  dayForecast,
  onClick,
  sunriseTime,
  sunsetTime,
}: WeatherDayCardProps) => {
  const isSelected = selectedDay === index;

  return (
    <div
      className={`${
        isSelected
          ? "bg-[#BBD7EC] w-[20vw] text-white"
          : "bg-[#333333] w-[12vw] text-gray-300"
      } rounded-[30px] cursor-pointer text-center overflow-hidden transition-all duration-300 ease-in-out`}
      onClick={() => onClick(index)}
    >
      {isSelected ? (
        <div>
          <div className="flex justify-between text-lg font-bold items-center bg-[#AECADF] w-full h-[56px] p-4 text-black">
            <p>{dayName}</p>
          </div>
          <div className="flex flex-col justify-between text-black">
            <div className="flex items-center justify-between p-3">
              <p className="text-5xl">{dayForecast?.day.avgtemp_c || "N/A"}°</p>
              <img
                src={dayForecast?.day.condition.icon}
                alt="ícone do tempo"
                className="w-15 h-15"
              />
            </div>
            <div className="flex gap-4 p-3 justify-between items-center">
              <div className="flex-col justify-start items-start">
                <p className="flex items-start text-[#4F5658]">
                  Vento:{" "}
                  <span className="font-bold text-black ml-2">
                    {dayForecast?.day.maxwind_kph} km/h
                  </span>
                </p>
                <p className="flex items-start text-[#4F5658]">
                  Chuva:{" "}
                  <span className="font-bold text-black ml-2">
                    {dayForecast?.day.daily_chance_of_rain}%
                  </span>
                </p>
                <p className="flex items-start text-[#4F5658]">
                  Umidade:{" "}
                  <span className="font-bold text-black ml-2">
                    {dayForecast?.day.avghumidity || "N/A"}%
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="flex text-[#4F5658]">Nascer do Sol</p>
                <span className="font-bold text-black">{sunriseTime}</span>
                <p className="flex text-[#4F5658]">Pôr do Sol</p>
                <span className="font-bold text-black">{sunsetTime}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full p-4">
          <p className="border-b border-gray-300 w-full">{dayName}</p>
          <img
            src={dayForecast?.day.condition.icon}
            alt="ícone do tempo"
            className="w-15 h-15"
          />
          <div className="flex justify-center mb-2">
            <p className="text-2xl font-bold">
              {dayForecast?.day.avgtemp_c || "N/A"}°
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
