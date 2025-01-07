import { FC, useRef, useState } from "react"
import { RiSearch2Line } from "react-icons/ri";
import { MdDirectionsBike } from "react-icons/md";
import { TfiFaceSad } from "react-icons/tfi";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

import Pagination from "./Pagination";
import { useQuery } from "react-query";
import { BaseConfig } from "../constants/constants";
import { bikesData } from "../apis/fetchData";
import { Bike } from "../constants/types";
import BikeCard from "./BikeCard";
import Loader from "../UI/Loader";

const Home : FC = () => {
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [searchValue, setSearchValue] = useState<string>("")
    const refInput = useRef<HTMLInputElement>(null)

    const params = new URLSearchParams({
        page: `${pageNumber}`,
        query: `${searchValue}`,
        per_page: '10',
        ...BaseConfig
    });
    const queryStringBikes : string = new URLSearchParams(params).toString();
    
    const {data : bikes, isError, isLoading} = useQuery({
        queryKey: ["bikes", { pageNumber,  searchValue}],
        queryFn:  async () => bikesData(queryStringBikes)
    })
    
    const searchBikesHandler = () => {
        const searchVal : string = refInput.current!.value;
        setSearchValue(searchVal.trim())
    }

    return <>
        <div className="bg-indigo-800 p-4">
            <div className="flex sm:flex-col justify-center items-center gap-2 my-8  text-white">
                <MdDirectionsBike className="text-3xl" />
                <p className="text-2xl text-center uppercase">Protecting bikes before they're stolen</p>
            </div>
            
            <div className="flex sm:flex-col gap-4">
                    <div className="flex-grow relative">
                        <input 
                            ref={refInput} 
                            type="text" 
                            name="bike" 
                            placeholder="Search for bike (Title, location, year...)" 
                            className="w-full py-3 px-2 rounded-lg outline-none" 
                        />
                        <RiSearch2Line className="text-xl absolute right-4 top-[50%] -translate-y-[50%]" />
                    </div>
                    
                    <button 
                        onClick={searchBikesHandler} 
                        className=" py-3 px-6 font-bold hover:cursor-pointer duration-150 hover:ring-2 bg-white text-indigo-800 rounded-lg">
                            Search
                    </button>
            </div>
        </div>
        
        <div className="w-full min-h-[50vh] flex items-center justify-center">
            {
                isLoading  ? <Loader /> 
                : isError  ? <p className="text-red-500 font-bold"><MdOutlineReportGmailerrorred className="text-3xl text-red-500 inline-flex"/> Something went Wrong!</p> 
                : <div className="flex items-center flex-col">
                    {
                    bikes != null && bikes?.length != 0 ? 
                    <div className="p-4 grid lg:grid-cols-1 grid-cols-2 gap-3">
                        {
                            bikes?.map((bike : Bike, id) => (
                                <BikeCard 
                                    key={id} 
                                    bike={bike} 
                                />
                            ))
                        }
                    </div> 
                    : <p className=" text-indigo-700 font-bold"><TfiFaceSad className="text-indigo-700 text-2xl inline-block"/> There are no bikes!</p>
                    }                
                    <Pagination 
                        searchValue={searchValue}
                        queryString={queryStringBikes}
                        setPageNumber={setPageNumber}
                        pageNumber={pageNumber} 
                    />
                </div>
            }
        </div>
    </>
}

export default Home