import { useEffect, useState, createContext } from "react";
import { getVideos, uploadVideo, uploadUser,getUsers } from "../api/video.api";

export const AppContext = createContext();

export function AppContextProvider(props) {
  
  const [users, setUsers] = useState(null);
  
  {
    /*
    videos: array donde se guarda los datos de los videos
    setVideos: set every data element in the array videos   
    */
  }

  const [videos, setVideos] = useState([]);

  {
    /*Query de los videos*/
  }

  async function reLoadAll() {
    setVideos(await getVideos());
    setUsers(await getUsers());
  }

  useEffect(() => {
    reLoadAll();
  }, []);

  {
    /* SubmitForm: for send the data via axios */
  }

  const submitForm = async (data, type) => {

    {
      /* formData: for charging the data inside of him */
    }
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key) && key === "file_video")
        formData.append(key, data[key][0]);
      else 
        formData.append(key, data[key]);
    }

    {
      /* The data is loaded into the db via axios to the api with the function uploadVideo */
    }
    
    try {
      if (type == "video") {
        const res = await uploadVideo(formData);
        console.log("Loaded in table videos");
        console.log(res);
        {
          /*refresh the page of the videos*/
        }
        reLoadAll();
      } else {
        const res = await uploadUser(formData);
        console.log("loaded in table users");
        console.log(res);
      }
    } catch (error) {
      console.log(`${type} error`);
      console.log(error);
      console.log(formData);
    }
  };

  const logInVerification = async (data) => {
    const temp = await users.data
        .filter((element)=>(element.ci === data.cedula));
    if(temp.length != 0){
      data.filter((element)=>{
        element.ci === data.cedula && element.password_user === data.password_user
      })
    }
  }

  return (
    <AppContext.Provider
      value={{
        /*Passing the functions */
        videos,
        submitForm,
        logInVerification,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
