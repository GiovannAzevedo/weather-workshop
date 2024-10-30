import axios from "axios"
import { ChangeEvent, useState } from "react"
import { HeaderProps, Suggestion } from "../types"
import { useFloatingLogic } from "./useFloatingLogic"


export const useHeader = ({fetchWeather}: HeaderProps) => {
    const [address, setAddress] = useState<string>("")
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [error, setError] = useState<string>('')

    const { isOpen, setIsOpen, x, y, strategy, refs, getFloatingProps } = useFloatingLogic({ placement: 'bottom-start' })

    const floatingStyle = {
        position: strategy,
        top: y ?? 0,
        left: x ?? 0
    }

    const fetchLocation = async (_addr: string) => {
        try {
            const result = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${_addr}&lang=pt`)
            
            setSuggestions(result.data.results ?? [])
        } catch (e: any) {
            setError(String(e))
        }
    }

    const handleChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
        const _addr = event.target.value
        setAddress(_addr)
        fetchLocation(_addr)
    }

    const handleClickSuggestion = (suggestions : Suggestion) => {
        setAddress(suggestions.name)
        setIsOpen(false)
        fetchWeather(suggestions.latitude, suggestions.longitude)
    }
  
    return {
        address,
        handleChangeAddress,
        suggestions,
        isOpen,
        setIsOpen,
        refs,
        getFloatingProps,
        floatingStyle,
        handleClickSuggestion,
        error
    }
}