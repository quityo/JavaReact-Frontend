import axios from "axios"

export default class EducationService{
   
    getByCvId(cvId){
        return axios.get(`http://localhost:8080/api/educations/getByCvId?cvId=${cvId}`)
    }

    add(education){
        return axios.post("http://localhost:8080/api/educations/add",education)
    }

    delete(educationId){
        return axios.delete(`http://localhost:8080/api/educations/delete?educationId=${educationId}`)
    }
}