import axios from "axios"

export default class JobPositionService{
    getJobPositions(){
        return axios.get("http://localhost:8080/api/jobpositions/getall")
    }
    getByAsc(){
        return axios.get("http://localhost:8080/api/jobpositions/getallasc")
    }

    getById(jobPositionId){
        return axios.get("http://localhost:8080/api/jobpositions/getbyid?id="+jobPositionId)
    }
}