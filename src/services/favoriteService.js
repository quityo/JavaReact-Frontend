import axios from "axios";

export default class FavoriteService{

    getByJobseekerId(userId){

    return axios.get("http://localhost:8080/favorites/getByJobseekerId?userId="+userId)
        }

        addFavorite(userId,jobAdvertId){
            return axios.post(`http://localhost:8080/favorites/addFavorite?jobAdvertId=${jobAdvertId}&userId=${userId}`)
        }
    
        removeFavorite(favoriteId){
            return axios.delete("http://localhost:8080/favorites/removeFavorite?favoriteId="+favoriteId)
        }
}

