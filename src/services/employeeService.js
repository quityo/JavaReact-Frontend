import axios from "axios"

export default class EmployeeService{
    getEmployees(){
        return axios.get("http://localhost:8080/api/employees/getall")
    }
    setJobStatusToActive(jobAdvert){
        return axios.post("http://localhost:8080/api/personnels/approvejob", jobAdvert)
    }
}