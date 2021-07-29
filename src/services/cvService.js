import axios from "axios";

export default class CvService {
  getAll() {
    return axios.get("http://localhost:8080/api/cvs/getall");
  }
  getByJobseeker(userId) {
    return axios.get(
      "http://localhost:8080/api/cvs/getByJobseeker?userId=" + userId
    );
  }

  updateGithub(cvId, githubAddress) {
    return axios.put(
      `http://localhost:8080/api/cvs/updateGithub?cvId=${cvId}&githubAddress=${githubAddress}`
    );
  }

  updateLinkedin(cvId, linkedinAddress) {
    return axios.put(
      `http://localhost:8080/api/cvs/updateLinkedin?cvId=${cvId}&linkedinAddress=${linkedinAddress}`
    );
  }

  updateBiography(cvId, coverLetter) {
    return axios.put(
      `http://localhost:8080/api/cvs/updateBiography?coverLetter=${coverLetter}&cvId=${cvId}`
    );
  }

  deleteGithub(cvId) {
    return axios.delete(
      `http://localhost:8080/api/cvs/deleteGithub?cvId=${cvId}`
    );
  }

  deleteLinkedin(cvId) {
    return axios.delete(
      `http://localhost:8080/api/cvs/deleteLinkedin?cvId=${cvId}`
    );
  }
}
