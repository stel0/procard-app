import { useEffect, useState, createContext } from "react";
import {
  getVideos,
  uploadVideo,
  uploadUser,
  getUsers,
  getUser,
} from "../api/video.api";

export const AppContext = createContext();

export function AppContextProvider(props) {
  /*Data users*/
  const [users, setUsers] = useState(null);

  /*Logged user*/
  const [loggedUser, setLoggedUser] = useState("");

  /*clientErrors: error messages for the client side */
  const [clientMsg, setClientMsg] = useState("");

  /*
  videos: array donde se guarda los datos de los videos
  setVideos: set every data element in the array videos   
  */

  const [videos, setVideos] = useState([]);

  /*Query de los videos*/

  async function reLoadAll() {
    setVideos(await getVideos());
    setUsers(await getUsers());
  }
  useEffect(() => {
    reLoadAll();
  }, []);

  /*This function search the user in the database, if exists return user, else return undefined*/
  const searchUser = (userData) => {
    let res = null;
    /*If the client is login*/
    if (Object.keys(userData).length <= 2) {
      res = users.data.find(
        ({ ci, password }) =>
          ci === userData.ci && password === userData.password
      );
      /*If the user is creating a user*/
    } else {
      try {
        /*If the user exists return the user data if not return undefined*/
        res = users.data.find(
          ({ ci, mail }) => ci === userData.ci || mail === userData.mail
        );
      } catch (e) {
        /*In case of an error */
        console.log("error", e);
      }
    }
    console.log(res);
    return res;
  };

  /* SubmitForm: function to submit the form */

  const submitForm = async (data, type) => {
    {
      /* formData:charging the data */
    }
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key) && key === "file_video")
        formData.append(key, data[key][0]);
      else formData.append(key, data[key]);
    }

    /* The data is send to the api */

    try {
      /*If the user is uploading a video*/
      if (type == "video") {
        const res = await uploadVideo(formData);
        console.log("Loaded in table videos");
        console.log(res);
        /*refresh the get data*/
        reLoadAll();
      }
      /*If is not uploading a video then the client is creating a user*/
      if (searchUser(data) === undefined) {
        /*Upload the user in the db*/
        const res = await uploadUser(formData);
        console.log("loaded in table users");
        setClientMsg("Usuario creado con exito, porfavor verificar correo");
        console.log(res);
      } else {
        console.log("User already exists");
        setClientMsg("Un usuario ya tiene esa cedula y/o mail");
        console.log(searchUser(data));
      }
      /*refresh the get data*/
      reLoadAll();
    } catch (error) {
      /*In case of an error in the axios call*/
      console.log(`${type} error`);
      console.log(error);
      console.log(formData);
    }
  };

  const login = async (data) => {
    const res = await searchUser(data);
    res === undefined
      ? setClientMsg("Verifique datos")
      : setClientMsg("Bienvenido");
    setLoggedUser(res);
  };

  
  return (
    <AppContext.Provider
      value={{
        /*Passing the functions */
        videos,
        submitForm,
        clientMsg,
        login,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
