import axios from "axios";

export default class EmployerService {
  getEmployers() {
    return axios.get("http://localhost:8080/api/employers/getall");
  }
  getEmployerId(userId) {
    return axios.get(
      "http://localhost:8080/api/employers/getById?userId=" + userId
    );
  }
  update(userId) {
    return axios.put("http://localhost:8080/api/employers/update", userId);
  }

  updateConfirmStatus(userId) {
    return axios.post(
      "http://localhost:8080/api/employers/updateConfirmStatus?userId=" + userId
    );
  }
  getByConfirmStatusFalse() {
    return axios.get(
      "http://localhost:8080/api/employers/getByConfirmStatusFalse"
    );
  }
}
