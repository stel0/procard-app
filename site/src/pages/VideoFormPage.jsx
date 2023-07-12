import { useForm } from "react-hook-form";
//uploadVideo: adds the data to the database
import { uploadVideo } from "../api/video.api";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

export function VideoFormPage() {

  {
    /*loadVideos: para actualizar la lista de videos*/
  }
  const { loadVideos } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  {
    /* SubmitForm: for send the data via axios */
  }
  const submitForm = (data) => {
    {
      /*
      formData: for charging the data inside of him
      */
    }
    const formData = new FormData();
    formData.append("title",data.title);
    formData.append("file_video", data.file_video[0]);

    {
      /* The data is loaded into the db via axios to the api with the function uploadVideo */
    }
    uploadVideo(formData)
      .then((res) => {
        console.log("Loaded into the db");
        console.log(res);
        {
          /*refresh the page of the videos*/
        }
        loadVideos()
      })
      .catch((error) => {
        console.log("Theres is an error");
        console.log('Error:',error);
        console.log(data);
      });
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <input
          type="text"
          placeholder="title"
          {...register("title", { required: true })}
        />
        {errors.title && <span>This field is required</span>}

        <input type="file" {...register("file_video", { required: true })} />
        {errors.file_video && <span>This field is required</span>}

        <button>Save</button>
      </form>
    </div>
  );
}
