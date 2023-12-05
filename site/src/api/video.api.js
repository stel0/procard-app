import axios from "axios";


axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials: true,
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

export const login_user = (in_data) =>
  api
    .post("/user/login/",{
      ci: in_data.ci,
      password: in_data.password,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });

export const logout_user = () =>
  api
    .get("/user/logout/")
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.error(error);
    });


export const check_permissions = () =>
  api
    .get("/user/check_permissions/")
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    })
