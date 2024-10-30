import { IoIosSearch } from "react-icons/io"
import { useHeader } from "../hooks/useHeader"
import { HeaderProps, Suggestion } from "../types"

export const Header = ({fetchWeather}: HeaderProps) => {
    const {
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
    } = useHeader({fetchWeather})

    console.log(suggestions)

    return (
        <div className="flex flex-row justify-between p-4 bg-gray-800 rounded-lg items-center">
            <h1 className="text-xl font-bold text-white">Weather Forecast</h1>
            <div className="flex flex-row items-center input input-bordered bg-white w-[400px] justify-between" ref={refs.setReference}>
                <input 
                    onClick={() => setIsOpen(true)}
                    placeholder="Pesquise a cidade..." 
                    type="text"
                    value={address}
                    onChange={handleChangeAddress}
                />
                <IoIosSearch className="text-gray-400"/>
            </div>
            {isOpen ? <ul 
                className="bg-white w-[400px] rounded mt-1 shadow-lg"
                style={floatingStyle}
                ref={refs.setFloating}
                {...getFloatingProps()}
                >
                    {
                    suggestions?.length > 0 ?
                        suggestions.map((it: Suggestion) => 
                            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                            onClick={() =>
                            handleClickSuggestion(it)} 
                            >{it.name} - {it.country}</li>
                        ) 
                        : <></>
                    }
                    {error ? <p className="text-bold tex-red-500">{error}</p> : <></>}
            </ul> : <></>}
        </div>
    )
}
