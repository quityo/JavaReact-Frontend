import axios from "axios"

export default class SkillService{
    getSkills(){
        return axios.get("http://localhost:8080/api/skills/getall")
    }
    getSkillsByJobseeker(jobseekerId){
        return axios.get("http://localhost:8080/api/skills/getByJobseekerId?id="+jobseekerId)
    }
}