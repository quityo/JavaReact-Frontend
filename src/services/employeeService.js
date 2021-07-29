import axios from "axios";

export default class EmployeeService {
  getEmployees() {
    return axios.get("http://localhost:8080/api/employees/getAll");
  }

  getEmployeeId(userId) {
    return axios.get(
      "http://localhost:8080/api/employees/getById?userId=" + userId
    );
  }

  add(values) {
    return axios.post("http://localhost:8080/api/employees/add", values);
  }

  update(userId) {
    return axios.put("http://localhost:8080/api/employees/update", userId);
  }
}
