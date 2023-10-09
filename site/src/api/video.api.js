import axios from "axios";

const api = axios.create({ baseURL: "http://127.0.0.1:8000/api/" });

// Videos

export const getVideos = () => api.get("/video/get_all_videos/");
export const uploadVideo = (data) => api.post("/video/upload_video/", data);
export const deleteVideo = (data) => api.delete("/video/delete_video/", data);
export const editVideo = (data) => api.put("/video/edit_video/", data);

// User

export const login_user = (data) =>
  api.post("/user/login/", {
      ci: data.ci,
      password: data.password,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });


    