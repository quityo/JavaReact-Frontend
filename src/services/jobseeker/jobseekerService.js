import axios from "axios"

export default class JobseekerService{
    getJobseekers(){
        return axios.get("http://localhost:8080/api/jobseekers/getall")
    }
    getJobseekerUserId(userId){
        return axios.get("http://localhost:8080/api/jobseekers/getbyid?id="+userId)
    }
    jobseekerAdd(values){
        return axios.post("http://localhost:8080/api/jobseekers/add",values)
    }
    getMailVerifyedJobseekers(){
        return axios.get("http://localhost:8080/api/jobseekers/getMailVerifyTrue")
    }
}