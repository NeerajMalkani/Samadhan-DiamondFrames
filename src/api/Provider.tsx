import axios from "axios";

const BASE_URL = "http://43.204.210.148/api";

class Provider {
  getAll(resource: string) {
    return axios.get<Array<any>>(`${BASE_URL}/${resource}`, {
      headers: {
        "Content-Type": "application/json",
        XApiKey: "pgH7QzFHJx4w46fI~5Uzi4RvtTwlEXp",
      },
    });
  }
  get(resource: string, id: string) {
    return axios.get<any>(`${BASE_URL}/${resource}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        XApiKey: "pgH7QzFHJx4w46fI~5Uzi4RvtTwlEXp",
      },
    });
  }
  create(resource: string, params: any) {
    return axios.post<any>(`${BASE_URL}/${resource}`, params, {
      headers: {
        "Content-Type": "application/json",
        XApiKey: "pgH7QzFHJx4w46fI~5Uzi4RvtTwlEXp",
      },
    });
  }
  update(resource: string, params: any, id: any) {
    return axios.put<any>(`${BASE_URL}/${resource}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        XApiKey: "pgH7QzFHJx4w46fI~5Uzi4RvtTwlEXp",
      },
    }, params);
  }
  delete(resource: string, id: any) {
    return axios.delete<any>(`${BASE_URL}/${resource}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        XApiKey: "pgH7QzFHJx4w46fI~5Uzi4RvtTwlEXp",
      },
    });
  }
  deleteAll(resource: string) {
    return axios.delete<any>(`${BASE_URL}/${resource}`, {
      headers: {
        "Content-Type": "application/json",
        XApiKey: "pgH7QzFHJx4w46fI~5Uzi4RvtTwlEXp",
      },
    });
  }
}
export default new Provider();
