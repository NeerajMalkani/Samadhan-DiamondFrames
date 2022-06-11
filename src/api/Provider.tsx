import axios from "axios";

const BASE_URL = "https://api.tvmaze.com";

class Provider {
  getAll(resource: string) {
    return axios.get<Array<any>>(`${BASE_URL}/${resource}`);
  }
  get(resource: string, id: string) {
    return axios.get<any>(`${BASE_URL}/${resource}/${id}`);
  }
  create(resource: string, params: any) {
    return axios.post<any>(`${BASE_URL}/${resource}`, params);
  }
  update(resource: string, params: any, id: any) {
    return axios.put<any>(`${BASE_URL}/${resource}/${id}`, params);
  }
  delete(resource: string, id: any) {
    return axios.delete<any>(`${BASE_URL}/${resource}/${id}`);
  }
  deleteAll(resource: string) {
    return axios.delete<any>(`${BASE_URL}/${resource}`);
  }
}
export default new Provider();
