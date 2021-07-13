import axios from "axios"

export default class EmployerService{
    getEmployers(){
        return axios.get("http://localhost:8080/api/employers/getall")
    }
    getEmployerId(userId){
        
        return axios.get("http://localhost:8080/api/employers/getById?userId="+userId)
    }
    update(employerModel){
        return axios.put("http://localhost:8080/api/employers/update",employerModel)
    }
}