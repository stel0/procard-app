import axios from "axios";

const videoApi_videos = axios.create({
  baseURL: "http://127.0.0.1:8000/videos/api/v1/videos/"
});

export const getVideos = () => videoApi_videos.get("/");
export const uploadVideo = (data) => videoApi_videos.post("/", data)
export const deleteVideo = (data) => videoApi_videos.delete("/",data)
export const editVideo = (data) => videoApi_videos.put("/", data);
    

const videoApi_users = axios.create({
  baseURL: "http://127.0.0.1:8000/videos/api/v1/users/",
});

export const getUsers = () => videoApi_users.get("/");
export const uploadUser = (data) => videoApi_users.post("/", data)
export const deleteUser = (data) => videoApi_users.delete("/",data)
export const editUser = (data) => videoApi_users.put("/", data);
