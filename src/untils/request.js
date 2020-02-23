import axios from "axios";

export const baseUrl = "https://uglyspoon.com/api/netease/";

axios.defaults.baseURL = baseUrl;
axios.defaults.timeout = 5000;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000
});

axiosInstance.interceptors.response.use(
  response => response.data,
  err => {
    console.log(err, "网络错误");
  }
);

export { axiosInstance };

const request = async (url, data, type = "GET") => {
  let promise;
  try {
    if (type === "GET") {
      promise = await axios.get(url, { params: data });
    } else {
      promise = await axios.post(url, data);
    }
    return promise.data;
  } catch (error) {
    // handleError
    console.log("request ", error);
  }
};

export default request;
