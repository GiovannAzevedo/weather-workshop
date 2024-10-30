import { Header } from "./components/Header"
import { WeatherForecast } from "./components/WeatherForecast"
import { useWeather } from "./hooks/useWeather"

function App() {
  const { weather, error, fetchWeather } = useWeather()
  
  return (
    <div className='min-h-screen w-full bg-black p-4'>
      <Header fetchWeather={fetchWeather}/>
      {error ? <span className="font-bold text-red-600">{error}</span> : <></>}
      {weather ? <WeatherForecast weather={weather}/> : <h2 className="text-center text-md">Nenhuma cidade selecionada</h2>}
    </div>
  )
}

export default App
