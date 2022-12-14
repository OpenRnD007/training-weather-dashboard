import React, { useContext, useState } from "react"
import { WeatherContext, WeatherType } from "./context"
import WeatherWeight from "./WeatherWeight"

const Weather = () => {
    const { cityArr } = useContext(WeatherContext) as WeatherType;
    const [darkMode, setDarkMode] = useState<boolean>(false);

    return (
        <React.Fragment>
            <button className={`${!darkMode ? "bg-zinc-700 text-white" : "border bg-gray-300 text-zinc-900"} px-3 py-1 rounded-xl`} onClick={() => {
                setDarkMode(prev => !prev)
            }}>{darkMode ? "Light" : "Dark"} Mode</button>

            <div className={`grid gap-x-2 gap-y-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 md:p-6 ${darkMode ? "dark" : ""}`}>
                {cityArr.map((e, i) =>
                    <React.Fragment key={i}>
                        <WeatherWeight key={i} city={e ?? ""} inx={i} />
                    </React.Fragment>
                )}
            </div>
        </React.Fragment>
    )
}

export default Weather