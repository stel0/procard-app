import { useEffect, useState, createContext, useContext } from "react";
import { getVideos, uploadVideo, login_user } from "../api/video.api";
import { useLocation, useNavigate } from "react-router-dom";
export const AppContext = createContext();

export function AppContextProvider(props) {
  /* 
    Logged user 
  */

  const [user_info, setUser] = useState(null);

  /*
    videos: array donde se guarda los datos de los videos
    setVideos: set every data element in the array videos   
  */

  const [videos, setVideos] = useState([]);

  /*
    Query de los videos
  */

  const fetchVideos = async () => {
    try {
      const getData = await getVideos();
      console.log(getData.data);
      setVideos(getData.data);
    } catch (e) {
      console.error("Error to fetching data:", e);
    }
  };

  /*
    Login method
  */

  const login = async (data) => {
    try {
      const response = await login_user(data);
      console.log(response.data);
      setUser(response.data);
      return response;
    } catch (e) {
      console.log("login failed");
    }
  };

  /*
    logout method
  */
  const logout = async (data) => {
    try {
      setUser(null);
    } catch (error) {
      console.error("logout failed", e);
    }
  };
  /*
    SubmitForm: function to submit the form
  */

  const submitForm = async (data, type) => {
    console.log("Cargando datos...");

    /*
      formData:charging the data
    */

    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key) && key === "file_video")
        formData.append(key, data[key][0]);
      else formData.append(key, data[key]);
    }

    /*
      The data is send to the api
    */

    try {
      /*If the user is uploading a video*/
      if (type == "video") {
        const res = await uploadVideo(formData);
        console.log("Loaded in table videos");
        console.log(res);
        /*refresh the get data*/
        getData();
      }
      /*If is not uploading a video then the client is creating a user*/
      if (!searchUser(data)) {
        /*Upload the user in the db*/
        const res = await uploadUser(formData);
        console.log("loaded in table users");
        setCreateUserMsg("Usuario creado con exito, porfavor verificar correo");
        console.log(res);
      } else {
        console.log("User already exists");
        setCreateUserMsg("Un usuario ya tiene esa cedula y/o mail");
        console.log(searchUser(data));
      }
      /*refresh the get data*/
      getData();
    } catch (error) {
      /*In case of an error in the axios call*/
      console.log(`${type} error`);
      console.log(error);
      console.log(formData);
    }
  };

  return (
    <AppContext.Provider
      value={{
        /*Passing the functions */
        login,
        logout,
        user_info,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
