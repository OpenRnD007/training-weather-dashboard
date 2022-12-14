import { createContext, ReactNode, useEffect, useState } from "react";

/** Specify number panel grid from .env file */
export const weatherDefaultState: any = [...Array(parseInt(process.env.NEXT_PUBLIC_NO_OF_WEATHER_PANELS!))]

export type WeatherType = {
    cityArr: string[] | null[];
    saveCity: (city: string, inx: number) => void;
};

export const WeatherContext = createContext<WeatherType | null>(null);


const WeatherProvider = (props: { children: ReactNode }) => {
    const [cityArr, setCityArr] = useState<Array<string>>([])
    const saveCity = (city: string, inx: number) => {
        const allCities = [...cityArr]
        allCities[inx] = city
        setCityArr(prev => allCities)
    }
    /** collect city name from localstorage */
    useEffect(() => {
        const allCities = [...weatherDefaultState].map((e, inx) => {
            const city = localStorage.getItem("city_" + inx.toString()) ?? "";
            return city
        });
        setCityArr(allCities)
    }, [])
    return <WeatherContext.Provider value={{ cityArr, saveCity }}> {props.children} </WeatherContext.Provider>;
}

export default WeatherProvider


export const getWeatherInfo = async (info: { city: string, inx: number }) => {

    const req = await fetch(process.env.NEXT_PUBLIC_WEATHER_URL + "&q=" + info.city)
    if (!req) return null;

    const resp = await req.json()
    if (resp.cod === 200) {
        localStorage.setItem("data_" + info.inx.toString(), JSON.stringify(resp));
        localStorage.setItem("city_" + info.inx.toString(), resp.name);
    }
    return resp
}

export const getTodaysDate = () => {
    const d = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da}-${mo}-${ye}`;
}