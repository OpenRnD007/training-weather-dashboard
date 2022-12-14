import WeatherWeightEdit from "./WeatherWeightEdit";

const BlankWeight = (props: { inx: number }) => {
    return (
        <div className={`flex flex-col items-center justify-center rounded-xl p-4 w-full border-solid border-2 mt-2 shadow-lg dark:text-teal-300 dark:bg-stone-900 Blank min-h-[350px]`}>
            <WeatherWeightEdit inx={props.inx}/>
        </div>
    )
}

export default BlankWeight