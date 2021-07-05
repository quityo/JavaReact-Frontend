import axios from "axios"

export default class JobseekerService{
    getJobseekers(){
        return axios.get("http://localhost:8080/api/jobseekers/getall")
    }
    getJobseekerUserId(userId){
        return axios.get("http://localhost:8080/api/jobseekers/getbyid?id="+userId)
    }
    getJobseekerAdd(){
        return axios.get("http://localhost:8080/api/jobseekers/add")
    }
}