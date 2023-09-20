import axios from "axios";

const api_ = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});
export const getVideos = (data) => api_.get("/video/get_videos/")
export const uploadVideo = (data) => api_.post("/video/upload_video/", data);
export const deleteVideo = (data) => api_.delete("/video/delete_video/", data);
export const editVideo = (data) => api_.put("/video/edit_video/", data);

// const videoApi_users = axios.create({
//   baseURL: "http://127.0.0.1:8000/videos/api/v1/users/",
// });
// export const getUser = (data) =>
//   videoApi_users.get("/", {
//     params: { ci: data.ci },
//   });

