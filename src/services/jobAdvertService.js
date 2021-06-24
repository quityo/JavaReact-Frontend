import axios from "axios";

export default class JobAdvertService{
    
    
    getByConfirmAndActiveTrue(){
    return axios.get("http://localhost:8080/api/jobadverts/getbyisconfirmandisactive?isActive=true&isConfirm=true")
}

getByConfirmFalse(){
    return axios.get("http://localhost:8080/api/jobadverts/getbyisconfirm?isConfirm=false")
}

getByJobAdvertIdAndConfirmFalse(jobAdvertId){
    return axios.get("http://localhost:8080/api/jobadverts/getbyisconfirmandjobadvertid?isConfirm=false&jobAdvertId="+jobAdvertId)
}

getByJobAdvertId(jobAdvertId){
    return axios.get("http://localhost:8080/api/jobadverts/getbyid?jobAdvertId="+jobAdvertId)
}

add(values){
    return axios.post("http://localhost:8080/api/jobadverts/add",values)
}

confirm(jobAdvertId){
    return axios.post("http://localhost:8080/api/jobadverts/updateisconfirm?isConfirm=true&jobAdvertId="+jobAdvertId)
}
}