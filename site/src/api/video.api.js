import axios from 'axios'

const videoApi = axios.create({
  baseURL: "http://127.0.0.1:8000/videos/api/v1/videos/",
  headers: {"Content-Type": "multipart/form-data"}
});


export const getAllVideos = () =>  videoApi.get('/');
export const uploadVideo = (data) => videoApi.post('/',data);