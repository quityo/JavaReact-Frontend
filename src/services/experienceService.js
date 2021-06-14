import axios from "axios"

export default class ExperienceService{
    getExperiences(){
        return axios.get("http://localhost:8080/api/experiences/getall")
    }
    getExperienceByJobseekerId(jobseekerId){
        return axios.get("http://localhost:8080/api/jobExperiences/getAllByJobseekerId?id=" +jobseekerId)
    }
    getExperienceListsByJobseekerDESC(jobseekerId){
        return axios.get("http://localhost:8080/api/jobExperiences/getAllByJobseekerIdOrderByEndAtDesc?id="+jobseekerId)
    }
}