import React, { useContext, useRef } from "react";
import { WeatherContext, WeatherType } from "./context";

const WeatherWeightEdit = (props: { inx: number, edit?: boolean }) => {
    const searchdiv = useRef<HTMLDivElement>(null)
    const searchText = useRef<HTMLInputElement>(null)
    const searchIcon = useRef<HTMLInputElement>(null)

    const { saveCity } = useContext(WeatherContext) as WeatherType;
    const updateState = () => {
        if (searchText && searchText.current) {
            const txt = (searchText.current.value).trim()
            if (txt) {
                saveCity(txt, props.inx)
            }
            if (props.edit) {
                toggleDiv()
            }
        }
    }

    const toggleDiv = () => {
        if (searchdiv && searchdiv.current) {
            if (searchText && searchText.current) {
                searchText.current.value = "";
            }
            if (searchIcon && searchIcon.current) {
                searchIcon.current.classList.toggle(props.edit ? "opacityo" : "hide")
            }
            searchdiv.current.classList.toggle("hide")
        }
    }

    return (
        <React.Fragment>

            {!props.edit &&
                <div ref={searchIcon} className="self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                    <img
                        alt="add weather"
                        className='shadow-lg rounded-full cursor-pointer hover:border'
                        src={`/add.svg`}
                        onClick={toggleDiv}
                    />
                </div>
            }

            {props.edit &&
                <div ref={searchIcon} className='self-start'>
                    <svg onClick={toggleDiv} xmlns="http://www.w3.org/2000/svg" className='editsvg' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                </div>
            }

            <div ref={searchdiv} className={`hide items-center flex flex-col bg-gray-300 p-2 rounded-xl shadow-lg ${props.edit ? "mt-4 abscenter" : " mt-2 abscenter"}`}>
                <input ref={searchText} className="text-black rounded-xl p-2 w-[170px] mt-2" type="text" placeholder="City Name" />
                <div className="block">
                    <button onClick={updateState} className="border text-black shadow-lg rounded-xl bg-gray-200 px-3 py-1 mt-1 hover:bg-gray-300">Add</button>
                    <button onClick={toggleDiv} className="border text-black shadow-lg rounded-xl bg-gray-200 px-3 py-1 mt-1 hover:bg-gray-300 ml-1">Cancel</button>
                </div>
            </div>
        </React.Fragment>
    )
}
export default WeatherWeightEdit