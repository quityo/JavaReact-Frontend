export const ADD_TO_FAV = "ADD_TO_FAV"
export const REMOVE_FROM_FAV = "REMOVE_FROM_FAV"


export function addToFav(jobAdvert){
    return {
        type : ADD_TO_FAV,
        payload: jobAdvert
    }
}

export function removeFromFav(jobAdvert){
    return {
        type : REMOVE_FROM_FAV,
        payload: jobAdvert
    }
}