import axios from "axios";
import JwtService from "@/common/jwt.service";
import { API_URL } from "@/common/config";

const headers = {
  "Authorization": `Token ${JwtService.getToken()}`,
}

const ApiService = {
  // Query
  query(resource: string, params: any) {
    return axios.get(`${API_URL}/${resource}?${params}`).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },


  // Get
  get(resource: string, context = false) {
    if (context) {
      return axios.get(`${API_URL}/${resource}`, {headers}).catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`)
      });
    } else {
      return axios.get(`${API_URL}/${resource}`).catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`)
      });
    }
  },


  // Post
  post(resource: string, params: any, context = false) {
    if (context) {
      return axios.post(`${API_URL}/${resource}`, params, {headers});
    } else {
      return axios.post(`${API_URL}/${resource}`, params);
    }
  },


  // Update
  update(resource: string, slug: string, params: any) {
    return axios.put(`${API_URL}/${resource}/${slug}`, params);
  },


  // Put
  put(resource: string, params: any) {
    return axios.put(`${API_URL}/${resource}`, params);
  },


  // Delete
  delete(resource: string, context=false) {
    if (context) {
      return axios.delete(`${API_URL}/${resource}`, {headers})
    } else {
      return axios.delete(`${API_URL}/${resource}`);
    }
  }
};

export default ApiService;