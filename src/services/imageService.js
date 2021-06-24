import axios from "axios";

export default class ImageService {
    upload(file, userId) {
        const data = new FormData();
        data.append('file', file);
        return axios.post("http://localhost:8080/api/images/upload", data, { headers: { 'Content-Type': 'multipart/form-data' }, params: { userId } });
    }
    getByUserId(userId) {
        return axios.get(" http://localhost:8080/api/images/getByUserId?userId=" + userId);
    }
    getById(id) {
        return axios.get("http://localhost:8080/api/images/getById?id=" + id);
    }
    getJobImages(){
        return axios.get("http://localhost:8080/api/images/getAll")
    }

}