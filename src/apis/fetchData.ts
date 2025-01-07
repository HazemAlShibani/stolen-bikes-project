import { BaseURL } from "../constants/constants";
import { Bike } from "../constants/types";

export const bikesData = async (queryString : string) => {
    const response = await fetch(`${BaseURL}${'/search'}?${queryString}`);
    const data = await response.json()
    const bikesInformation : Bike[] = data.bikes.map((bikeInfo : any) => ({
        id: bikeInfo.id,
        title: bikeInfo.title,
        description: bikeInfo.description,
        year: bikeInfo.year,
        stolen_location: bikeInfo.stolen_location,
        date_stolen: bikeInfo.date_stolen,
        imgURL: bikeInfo.large_img,
    }))
    return bikesInformation
}

export const bikesCount = async (queryString : string) => {
    const response = await fetch(`${BaseURL}${'/search/count'}?${queryString}`);
    const data = await response.json()
    return data.proximity
}
