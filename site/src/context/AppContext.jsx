import { useEffect, useState, createContext } from "react";
import { getVideos, uploadVideo, uploadUser, getUsers } from "../api/video.api";

export const AppContext = createContext();

export function AppContextProvider(props) {
  /*Data users*/
  const [users, setUsers] = useState(null);

  /*clientErrors: error messages for the client side */
  const [clientErrors, setClientErrors] = useState({
    msg: "",
    inputs: [],
  });

  /*This function search the user in the database, if exists return true, else return false*/
  const searchUser = (userCreationData) => {
    const inputs = [];
    /*userExists: if the user already exists */
    /*OBS: can replace .some() for .find() but i can't test it xD*/
    const userExists = Object.values(users.data).some((user) => {
      /*Load the entries that are the same as the user registred in the database*/
      /*[{ci},{mail}]*/
      if (userCreationData.ci === user.ci)
        inputs.push({
          name: "ci",
          value: "Ya existe un usuario con esa cedula.",
        });
      if (userCreationData.mail === user.mail)
        inputs.push({
          name: "mail",
          value: "Ya existe un usuario con ese correo.",
        });
      setClientErrors({
        msg: "El usuario ya existe.",
        inputs: inputs,
      });
      /*Returns true if the user already exists*/
      return (
        userCreationData.ci === user.ci || userCreationData.mail === user.mail
      );
    });

    return userExists;
  };

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
      else formData.append(key, data[key]);
    }

    {
      /* The data is loaded into the db via axios to the api with the function uploadVideo */
    }

    try {
      if (type == "video") {
        const res = await uploadVideo(formData);
        console.log("Loaded in table videos");
        console.log(res);
        /*refresh the get data*/
        reLoadAll();
      } else if (!searchUser(data)) {
        const res = await uploadUser(formData);
        console.log("loaded in table users");
        console.log(res);
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

  const [loginError, setLoginError] = useState(null);

  const login = async (loginData /*=login data*/) => {
    // const usersDb = users; /*users table*/
    // /*Searching the user in the db*/
    // const user = usersDb.data.find((element) => element.ci === loginData.ci);
    // /*If the user is not empty enter the app*/
    // if (user) {
    //   if (user.password !== loginData.password) {
    //     setLoginError("password");
    //   }
    // } else {
    //   setLoginError("user");
    // }

    if (searchUser(!loginData)) {
      if (!clientErrors.inputs) setLoginError("user");
    } else {
      clientErrors.inputs.forEach((input) => {
        setLoginError(input.name);
      })
    }
  };

  return (
    <AppContext.Provider
      value={{
        /*Passing the functions */
        videos,
        submitForm,
        login,
        clientErrors,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
