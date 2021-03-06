import axios from "axios";

export default class LanguageService {
  getByCvId(cvId) {
    return axios.get(
      `http://localhost:8080/api/languages/getByCvId?cvId=${cvId}`
    );
  }

  delete(languageId) {
    return axios.delete(
      `http://localhost:8080/api/languages/delete?languageId=${languageId}`
    );
  }

  add(values) {
    return axios.post("http://localhost:8080/api/languages/add", values);
  }
}
