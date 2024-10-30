import axios from "axios"
import { useState } from "react"
import { Weather } from "../types"

const key = import.meta.env.VITE_WEATHER_API_KEY

export const useWeather = () => {
    const [weather, setWeather] = useState<Weather>()
    const [error, setError] = useState<string>("")

    const fetchWeather = async (latitude: number, longitude: number) => {
        try {
            const result = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${latitude},${longitude}&days=7&aqi=no&alerts=no`)

            setWeather(result.data)
        } catch (e) {
            setError("Erro ao buscar clima")
        }
    }

    return {
        fetchWeather,
        error,
        weather
    }
}