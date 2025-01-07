import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";
import { TbMotorbike } from "react-icons/tb";
import { useQuery } from "react-query";
import { bikesCount } from "../apis/fetchData";
import { FaBicycle } from "react-icons/fa6";

const Pagination = ({setPageNumber, pageNumber, queryString, searchValue}: {pageNumber: number, setPageNumber: Dispatch<SetStateAction<number>>, queryString: string, searchValue: string }) => {

    const {data : countOfBikes, isLoading} = useQuery({
        queryKey: ["countOfBikes", { searchValue }],
        queryFn: async () => bikesCount(queryString)
    })

    const totalPage = Math.ceil(countOfBikes / 10);

    return isLoading ? <FaBicycle className="text-2xl text-center text-indigo-700 my-2 animate-bounce"/> 
            : countOfBikes != 0 ?
                <div className="w-[50%] mx-auto flex items-center justify-between my-5">
                    <FaChevronLeft 
                        onClick={() => { pageNumber == 1 ? null : setPageNumber((prev) => --prev) }}
                        className={`${pageNumber == 1 ? "hover:cursor-not-allowed text-gray-300": ""} ${"4xl hover:cursor-pointer duration-150"}`}
                    />
                    <div>{pageNumber}</div>
                    <div className="flex bg-indigo-700 py-1 px-2 rounded-lg text-white font-bold gap-1 justify-center items-center">
                        {countOfBikes}
                        <TbMotorbike/>
                    </div>
                    <div>{totalPage}</div>
                    <FaChevronRight 
                        onClick={() =>  { pageNumber == totalPage ? null : setPageNumber((next) => ++next)}}  
                        className={`${pageNumber == totalPage ? "hover:cursor-not-allowed text-gray-300": ""} ${"4xl hover:cursor-pointer duration-150"}`}
                    />
                </div> 
            : null
}

export default Pagination