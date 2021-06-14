import axios from "axios"

export default class LinkService{
    getLinks(){
        return axios.get("http://localhost:8080/api/links/getall")
    }
    getLinksByJobseeker(jobseekerId){
        return axios.get("http://localhost:8080/api/links/getByJobseeker?jobSeekerId="+jobseekerId)
    }
}