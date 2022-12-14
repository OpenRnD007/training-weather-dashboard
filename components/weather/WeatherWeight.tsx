import React, { useContext, useEffect, useState } from 'react';
import BlankWeight from './BlankWeight';
import { getWeatherInfo, WeatherContext, WeatherType, getTodaysDate } from './context';
import { useNotification } from 'react-hook-notification';
import WeatherWeightEdit from './WeatherWeightEdit';

const WeatherWeight = (props: { city: string, inx: number }) => {
    const { saveCity } = useContext(WeatherContext) as WeatherType;
    const notification = useNotification();
    const [data, setData] = useState<any>(null)

    const recursiveWeatherInfo = () => {
        /** Different library are avaliable to achieve this, but I have created my own logic for apicall|offline|30second */
        getWeatherInfo({ "city": props.city, inx: props.inx })
            .then(resp => {
                if (resp) {
                    if (resp.cod === "404") {
                        notification.error({
                            text: `Invalid City "${props.city}", Please Enter valid city name`,
                            position: "top-center"
                        })
                        saveCity("", props.inx)
                        setData(null)
                        return;
                    }
                    if (resp.name && !props.city) {
                        saveCity(resp.name, props.inx)
                    }
                }
                setData(resp)
            }).catch(err => {
                const res = localStorage.getItem("data_" + props.inx.toString());
                if (res) setData(JSON.parse(res))
            })
    }

    useEffect(() => {
        let timeout: ReturnType<typeof setInterval>;
        if (typeof props.inx !== "undefined" && props.inx > -1 && props.city) {
            recursiveWeatherInfo()
            timeout = setInterval(() => {
                recursiveWeatherInfo()
            }, parseInt(process.env.NEXT_PUBLIC_REFETCH_TIME!) * 1000)
        }
        return (() => {
            if (timeout) {
                clearInterval(timeout)
            }
        })
    }, [props.inx, props.city])

    if (!data) return <BlankWeight inx={props.inx} />

    return (
        <div className={`flex flex-col rounded-xl p-4 w-full border-solid border-2 mt-2 shadow-lg dark:text-teal-300 dark:bg-stone-900 ${data.weather[0].main}`}>
            <div className="font-bold text-xl">{data.name}</div>
            <div className='flex absolute'>
                <WeatherWeightEdit inx={props.inx} edit={true} />
            </div>
            <WeatherWeightHeader data={data} />
            <WeatherWeightTemperature data={data} />
            <WeatherWeightVisibility data={data} />
        </div>
    )
}

const WeatherWeightHeader = (props: { data: any }) => {
    const { data } = props
    return (
        <React.Fragment>
            <div className="text-sm subcontent dark:text-gray-200">{getTodaysDate()}</div>
            <div className="mt-6">{data.weather[0].main}</div>
            <div className="self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                <img
                    alt='weather icon'
                    className='shadow-lg rounded-full dark:border dark:border-grey-300'
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
            </div>
        </React.Fragment>
    )
}

const WeatherWeightTemperature = (props: { data: any }) => {
    const { data } = props
    return (
        <div className="flex flex-row items-center justify-center mt-6 shadow-xl  rounded-xl">
            <div className="font-medium text-5xl">{data.main.temp.toFixed(1)}°</div>
            <div className="flex flex-col items-center ml-6">

                <div className="mt-1">
                    <span className="text-sm"><small>max: </small></span>
                    <span className="text-sm font-light subcontent dark:text-gray-200">{data.main.temp_max.toFixed(1)}°C</span>
                </div>
                <div>
                    <span className="text-sm"><small>min: </small></span>
                    <span className="text-sm font-light subcontent dark:text-gray-200">{data.main.temp_min.toFixed(1)}°C</span>
                </div>
            </div>
        </div>
    )
}

const WeatherWeightVisibility = (props: { data: any }) => {
    const { data } = props
    return (
        <div className="flex flex-row justify-between mt-6">
            <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Wind</div>
                <div className="text-sm subcontent dark:text-gray-200">{data.wind.deg}°</div>
            </div>
            <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Clouds</div>
                <div className="text-sm subcontent dark:text-gray-200">{data.clouds.all}</div>
            </div>
            <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Visibility</div>
                <div className="text-sm subcontent dark:text-gray-200">{(parseInt(data.visibility) / 1000)}K</div>
            </div>
        </div>
    )
}

export default WeatherWeight