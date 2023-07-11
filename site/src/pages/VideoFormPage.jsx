import { useForm } from "react-hook-form";
import { uploadVideo } from "../api/video.api";
import { AppContext } from "../context/AppContext";
import { useContext, useState } from "react";

export function VideoFormPage() {
  {
    /*loadVideos: para actualizar la lista de videos*/
  }
  const [fileName, setFileName] = useState(null);

  const { loadVideos } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  {
    /*se ejecuta esta funcion al enviar el formulario*/
  }
  const onsub = async (data) => {
    {
      /*se cargan los datos en la base de datos*/
    }
    const res = await uploadVideo(data);
    console.log(res);
    {
      /*actualiza la base*/
    }
    loadVideos();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onsub)}>
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
