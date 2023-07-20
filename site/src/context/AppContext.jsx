import { useEffect, useState, createContext } from "react";
import { getVideos, uploadVideo, uploadUser, getUsers } from "../api/video.api";

export const AppContext = createContext();

export function AppContextProvider(props) {
  {
    /*Query de los usuarios*/
  }
  const [users, setUsers] = useState(null);

  /*clientErrors: error messages for the client side */
  const [clientErrors, setClientErrors] = useState({
    msg: "",
    inputs: [],
  });

  /*This function search the user in the database, if exists return true, else return false*/
  const searchUser = (userCreationData) => {
    /*userExists: if the user already exists*/
    const userExists = Object.values(users.data).some((user) => {
      return (
        userCreationData.ci === user.ci || userCreationData.mail === user.mail
      );
    });
    /*If the user exists then send a error message to the client*/
    if (userExists) {
      /*Load the entries that are the same as the user registred in the database*/
      const inputs = [];
      if (userCreationData.ci)
        inputs.push({ name: "ci", value: "La cedula ya existe." });
      if (userCreationData.mail)
        inputs.push({ name: "mail", value: "El mail ya existe." });
      setClientErrors({
        msg: "El usuario ya existe.",
        inputs: inputs,
      });
    }

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
      /*In case of an error in the uploadUser() function*/
      console.log(`${type} error`);
      console.log(error);
      console.log(formData);
    }
  };

  const logInVerification = async (logInData /*=login data*/) => {
    const usersDb = users; /*users table*/
    /*Searching the user in the db*/
    const user = await usersDb.data.filter(
      (element) => element.ci === logInData.ci
    );
    /*If the user is not empty enter the app*/
    if (user.length > 0) {
      console.log("User found");
      console.log(user);
    } else {
    }
  };

  return (
    <AppContext.Provider
      value={{
        /*Passing the functions */
        videos,
        submitForm,
        logInVerification,
        clientErrors,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
