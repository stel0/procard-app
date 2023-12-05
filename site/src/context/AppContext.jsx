import { useState, createContext } from "react";
import { uploadVideo, login_user, check_permissions,logout_user } from "../api/video.api";
export const AppContext = createContext();

export function AppContextProvider(props) {
  /* 
    Logged user 
  */

  const [user_info, setUser] = useState();

  /*
    Query de los videos
  */

  /* const fetchVideos = async () => {
    try {
      const getData = await getVideos()
          .then(function (response) {
          return response;
        })
        .catch(function (error) { 
          return null;
        });
      return(getData.data);
    } catch (e) {
      console.error("Error to fetching data:", e);
      return undefined
    }
  }; */

  /*
    Login method
  */

  const login = async (data) => {
    try {
      const response = await login_user(data);
      console.log(response);
      setUser(true);
      if (response.data) {
        console.log("login success");
        handlePermissions();
      }
      return response.data;
    } catch (e) {
      console.log("login failed");
    }
  };

  /*
    logout method
  */

  const logout = async (data) => {
    try {
      const res = await logout_user();
      return res;
    } catch (error) {
      console.error("logout failed", e);
    }
  };

  /*
    Check permissions
  */


  const handlePermissions = async () => {
    try {
      const res = await check_permissions();
      return res;
    } catch (error) {
      console.error("An error is ocurred", error);
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
        handlePermissions,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
