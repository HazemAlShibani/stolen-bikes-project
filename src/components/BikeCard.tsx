import { CiImageOff } from "react-icons/ci";
import { Bike } from "../constants/types";
import { useState } from "react";
import BikeInfo from "./BikeInfo";

const BikeCard = ({bike} : {bike: Bike}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false) 

    const clickHandler = () => {
        setIsOpen(!isOpen)
    }
    
    return <>
        {
            isOpen ? <BikeInfo bike={bike} clickHandler={clickHandler}/> : ""
        }
        <div onClick={clickHandler} className="flex gap-2 hover:cursor-pointer duration-150 bg-indigo-50 shadow-sm items-center h-[150px] rounded-lg overflow-hidden border-solid border-2 border-indigo-700 ">
            <div className="w-[40%] ">
                {
                bike.imgURL != null ?
                    <img className="w-full h-full" src={bike.imgURL} /> 
                    : <CiImageOff className="text-4xl mx-auto" />
                }
            </div>
            <div className="flex flex-col gap-2 max-w-[50%]">
                <div>
                    <p className="font-bold">Title</p>
                    <div className="text-sm">
                        {bike.title}
                    </div>
                </div>
                <div>
                    <p className="font-bold">Location</p>
                    <div className="text-sm">
                        {bike.stolen_location}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default BikeCard