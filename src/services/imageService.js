import axios from "axios";

export default class ImageService {
  upload(userId, file) {
    return axios.post(
      `http://localhost:8080/api/images/add?userId=${userId}`,
      file
    );
  }
  getById(userId) {
    return axios.get(
      "http://localhost:8080/api/images/getByUserId?userId=" + userId
    );
  }
  getByImageId(imageId) {
    return axios.get(
      "http://localhost:8080/api/images/getByImageId?imageId=" + imageId
    );
  }

  getAll() {
    return axios.get("http://localhost:8080/api/images/getall");
  }
  getByCvId(cvId) {
    return axios.get(`http://localhost:8080/api/images/getByCvId?cvId=${cvId}`);
  }
  update(file, imageId) {
    return axios.post(`http://localhost:8080/api/images/update/imageId=`  + imageId,
    file);
  }
}
