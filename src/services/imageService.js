import axios from "axios";

export default class ImageService {
    upload(file, userId) {
        const data = new FormData();
        data.append('file', file);
        return axios.post("http://localhost:8080/api/images/upload", data, { headers: { 'Content-Type': 'multipart/form-data' }, params: { userId } });
    }
    getByUserId(userId) {
        return axios.get("http://localhost:8080/api/images/getbyid?id=" + userId);
    }
    getById(imageId) {
        return axios.get("http://localhost:8080/api/images/getbyid?imageId=" + imageId);
    }
    getJobImages(){
        return axios.get("http://localhost:8080/api/images/getall")
    }
    getAll(){
        return axios.get("http://localhost:8080/api/images/getall")
    }
 
}