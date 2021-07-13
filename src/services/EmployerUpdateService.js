import axios from 'axios'

export default class EmployerUpdateService{
    getAll(){
        return axios.get("http://localhost:8080/api/employerUpdates/getAll");
    }

    getById(userId){
        return axios.get("http://localhost:8080/api/employerupdates/getById?userId="+userId)
    }

    getByStatusFalse(userId){
        return axios.get("http://localhost:8080/api/employerupdates/getByStatusFalse?userId="+userId);
    }

    getAllByStatusFalse(){
        return axios.get("http://localhost:8080/api/employerupdates/getAllByStatusFalse");
    }

    add(contentModel){
        return axios.post("http://localhost:8080/api/employerupdates/add",contentModel)
    }

    confirmContent(employerId){
        return axios.post("http://localhost:8080/api/employerupdates/confirmContent?employerId="+employerId);
    }
}