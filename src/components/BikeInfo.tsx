import { Dispatch, SetStateAction } from "react"
import { Bike } from "../constants/types"

const BikeInfo = ({bike, clickHandler}: {bike: Bike, clickHandler: () => void}) => {
    
    return <>
    <div onClick={clickHandler} className="fixed w-full top-0 left-0 h-screen bg-[#1c1f21a1]"></div>
    <div className="fixed z-10 p-3 flex flex-col gap-2 top-[20%] overflow-hidden left-[50%] rounded-lg -translate-x-[50%] bg-white w-[70%] sm:w-[90%] ">
        <p className="text-center text-xl font-bold">{bike.title} </p>
        <div className="flex flex-col gap-4">
            <div>
                <p className="font-bold text-indigo-700">Year</p>
                <p>{bike.year ? bike.year : "There is no Date!"}</p>
            </div>
            <div>
                <p className="font-bold text-indigo-700">Reported Date</p>
                <p>{bike.date_stolen ? bike.date_stolen: "There is No Date!"}</p>
            </div>
            <div>
                <p className="font-bold text-indigo-700">Location</p>
                <p>{bike.stolen_location? bike.stolen_location : "There is no Location!" }</p>
            </div>
            <div>
                <p className="font-bold text-indigo-700">Description</p>
                <p>{bike.description ? bike.description : "There is no Description!"}</p>
            </div>
            
        </div>
    </div>
    </>
}

export default BikeInfo