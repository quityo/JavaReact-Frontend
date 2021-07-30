import axios from "axios";

export default class ExperienceService {
  add(values) {
    return axios.post("http://localhost:8080/api/experiences/add", values);
  }

  delete(experienceId) {
    return axios.delete(
      `http://localhost:8080/api/experiences/delete?experianceId=${experienceId}`
    );
  }

  getByCvId(cvId) {
    return axios.get(
      `http://localhost:8080/api/experiences/getByCvId?cvId=${cvId}`
    );
  }
  updateWorkingPlace(experienceId, workingPlace) {
    return axios.put(
      `http://localhost:8080/api/experiences/updateWorkingPlace?workingPlace=${workingPlace}&experienceId=${experienceId}`
    );
  }

  updatePosition(experienceId, position) {
    return axios.put(
      `http://localhost:8080/api/experiences/updatePosition?experienceId=${experienceId}&position=${position}`
    );
  }

  deleteWorkingPlace(experienceId) {
    return axios.delete(
      `http://localhost:8080/api/experiences/deleteWorkingPlace?experienceId=${experienceId}`
    );
  }

  deletePosition(experienceId) {
    return axios.delete(
      "http://localhost:8080/api/experiences/deletePosition?experienceId=" +
        experienceId
    );
  }
}
