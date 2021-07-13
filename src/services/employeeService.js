import axios from "axios"

export default class EmployeeService{
    getEmployees(){
        return axios.get("http://localhost:8080/api/employees/getAll");
    }

    getEmployeeId(values){
        return axios.get("http://localhost:8080/api/employees/getById?userId="+values)
    }

    add(values){
        return axios.post("http://localhost:8080/api/employees/add",values)
    }

    update(employee){
        return axios.put("http://localhost:8080/api/employees/update",employee)
    }
}