import { useEffect, useState, createContext } from "react";
import { getAllVideos } from "../api/video.api";

export const AppContext = createContext()

export function AppContextProvider(props) {

  {/*
    videos: array donde se guarda los datos de los videos
    setVideos: set every data element in the array videos   
  */}

  const [videos, setVideos] = useState([]);

  {/*Query de los videos*/}

  async function loadVideos() {
    const res = await getAllVideos();
    setVideos(res.data);
  }

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <AppContext.Provider
      value={{
        /*Passing the functions or others*/
        videos,
        loadVideos
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
