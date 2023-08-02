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
  const [loggedUser, setLoggedUser] = useState({
    name: "",
    last_name: "",
    ci: "",
    mail: "",
    permissions: [],
  });

  /*Login user message*/
  const [userLoginMsg, setUserLoginMsg] = useState(null);

  /*clientErrors: error messages for the client side */
  const [createUserMsg, setCreateUserMsg] = useState(null);

  /*
  videos: array donde se guarda los datos de los videos
  setVideos: set every data element in the array videos   
  */

  const [videos, setVideos] = useState([]);

  /*Query de los videos*/

  async function getData() {
    setVideos(await getVideos());
    setUsers(await getUsers());
  }
  useEffect(() => {
    getData();
  }, []);

  /*This function search the user in the database, if exists return user, else return undefined*/
  const searchUser = async (userData) => {
    // let res = null;
    // /*If the client is login*/
    // if (Object.keys(userData).length <= 2) {
    //   res = users.data.find(
    //     ({ ci, password }) =>
    //       ci === userData.ci && password === userData.password
    //   );
    //   /*If the user is creating a user*/
    // } else {
    //   try {
    //     /*If the user exists return the user data if not return undefined*/
    //     res = users.data.find(
    //       /*check if the user exists*/
    //       ({ ci, mail }) => ci === userData.ci || mail === userData.mail
    //     );
    //   } catch (e) {
    //     /*In case of an error */
    //     console.log("error", e);
    //   }
    // }
    // if (res !== undefined) return res;
    // else return null;

    if (Object.keys(userData).length <= 2) {
      const { ci, password } = userData;
      const usersData = users.data;
      const user = usersData.find((user) => {
        ci === user.ci && password === user.password;
      });
      if (user) {
        return user;
      } else {
        return null;
      }
      // const user = userData.find((user)=>{ci === user.ci});
      // if(user){
      //   const permissions = [...user.permissions];
      //   setLoggedUser({
      //     name:user.name,
      //     last_name:user.last_name,
      //     ci:user.ci,
      //     permissions,
      //   })
      //   if(){

      //   }
      // }
    }
  };

  /* SubmitForm: function to submit the form */

  const submitForm = async (data, type) => {
    console.log("Cargando datos...");
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

  const login = (data) => {
    const user = searchUser(data);
    if (user) {
      const permissions = [...user.permissions];
      setLoggedUser({
        name: user.name,
        last_name: user.last_name,
        ci: user.ci,
        mail: user.mail,
        permissions,
      });
    }else{
      setLoggedUser({
        name: "",
        last_name: "",
        ci: "",
        mail: "",
        permissions: [],
      });
    }
    user.name ? setUserLoginMsg("Bienvenido") : setUserLoginMsg("Verifique datos");
    console.log(`Login, the searched user is:${user}`);
  };

  const logout = () => {
    setLoggedUser({
      name: "",
      last_name: "",
      ci: "",
      mail: "",
      permissions: [],
    });
  };

  return (
    <AppContext.Provider
      value={{
        /*Passing the functions */
        videos,
        submitForm,
        createUserMsg,
        userLoginMsg,
        login,
        loggedUser,
        logout,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
