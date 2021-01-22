import axios from "axios";
import { authConstants } from "../redux/actions/constants";
import store from "../redux/store";
import { api } from "../urlConfig";

const token = window.localStorage.getItem("token");

const axiosInstace = axios.create({
  baseURL: `https://joycors.herokuapp.com/${api}`,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosInstace.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

axiosInstace.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const status = error.response ? error.response.status : 500;
    if (status && status === 500) {
      localStorage.clear();
      store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }
    return Promise.reject(error);
  }
);

export default axiosInstace;
