import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});
export const getVideos = () => api.get("/video/get_all_videos/")
export const uploadVideo = (data) => api.post("/video/upload_video/", data);
export const deleteVideo = (data) => api.delete("/video/delete_video/", data);
export const editVideo = (data) => api.put("/video/edit_video/", data);

// const videoApi_users = axios.create({
//   baseURL: "http://127.0.0.1:8000/videos/api/v1/users/",
// });
// export const getUser = (data) =>
//   videoApi_users.get("/", {
//     params: { ci: data.ci },
//   });

