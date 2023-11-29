import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "HTTP_X_CSRFTOKEN";
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Videos

export const getVideos = (data) =>
  api
    .get("/video/get_all_videos/",{
      ci: data.ci,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });

export const uploadVideo = (data) => api.post("/video/upload_video/", data);
export const deleteVideo = (data) => api.delete("/video/delete_video/", data);
export const editVideo = (data) => api.put("/video/edit_video/", data);

// User

export const login_user = (data) =>
  api
    .post("/user/login/", {
      ci: data.ci,
      password: data.password,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });

export const check_permissions = (data) =>
  api
    .get("/user/check_permissions/", {
      ci: data.ci,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    })