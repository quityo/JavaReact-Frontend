import axios from "axios";

export default class SkillService {
  getSkills() {
    return axios.get("http://localhost:8080/api/skills/getall");
  }

  getSkillsByJobseeker(jobseekerId) {
    return axios.get(
      "http://localhost:8080/api/skills/getByJobseekerId?id=" + jobseekerId
    );
  }

  getByCvId(cvId) {
    return axios.get("http://localhost:8080/api/skills/getByCvId?cvId="+ cvId);
  }

  add(skill) {
    return axios.post("http://localhost:8080/api/skills/add", skill);
  }

  delete(skillId) {
    return axios.delete(
      `http://localhost:8080/api/skills/delete?skillId=${skillId}`
    );
  }
}
