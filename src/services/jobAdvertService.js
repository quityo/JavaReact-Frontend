import axios from "axios";

export default class JobAdvertService {
  getByConfirmAndActiveTrue() {
    return axios.get(
      "http://localhost:8080/api/jobadverts/getbyisconfirmandisactive?isActive=true&isConfirm=true"
    );
  }

  getByConfirmFalse() {
    return axios.get(
      "http://localhost:8080/api/jobadverts/getbyisconfirm?isConfirm=false"
    );
  }

  getByJobAdvertIdAndConfirmFalse(jobAdvertId) {
    return axios.get(
      "http://localhost:8080/api/jobadverts/getbyisconfirmandjobadvertid?isConfirm=false&jobAdvertId=" +
        jobAdvertId
    );
  }
  getById(jobAdvertId) {
    return axios.get(
      "http://localhost:8080/api/jobadverts/getbyid?id=" + jobAdvertId
    );
  }

  add(values) {
    return axios.post("http://localhost:8080/api/jobadverts/add", values);
  }

  confirm(jobAdvertId) {
    return axios.post(
      "http://localhost:8080/api/jobadverts/updateisconfirm?isConfirm=true&jobAdvertId=" +
        jobAdvertId
    );
  }

  getAll() {
    return axios.get("http://localhost:8080/api/jobadverts/getall");
  }

  getPageableAndFilterJobAdverts(pageNo, pageSize, filterOption){
    return axios.post(`http://localhost:8080/api/jobadverts/getByActiveAndFilter?pageNo=${pageNo}&pageSize=${pageSize}`,filterOption);
}
getPageableAndEmployerFilter(pageNo, pageSize, filterOption){
  return axios.post(`http://localhost:8080/api/jobadverts/getByActiveAndEmployerFilter?pageNo=${pageNo}&pageSize=${pageSize}`,filterOption);
}
}
