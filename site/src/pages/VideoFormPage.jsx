import {useForm} from 'react-hook-form'
import { uploadVideo } from "../api/video.api";
import {AppContext} from '../context/AppContext'
import {useContext,useState} from 'react'

export function VideoFormPage() {
  {/*loadVideos: para actualizar la lista de videos*/}
  const [fileName, setFileName] = useState(null);

  const { loadVideos } = useContext(AppContext);

  const {register,handleSubmit,formState:{errors}} = useForm();
  
  {/*se ejecuta esta funcion al enviar el formulario*/}
  const onsub = handleSubmit(async data=>{
    // const video = {
    //   title: await data.title,
    //   file_video: await data.file_video[0].name,
    // };

    let formData = new FormData();
    formData.append("video",fileName);
    {/*se cargan los datos en la base de datos*/}
    const res = await uploadVideo(formData);
    {/*actualiza la base*/}
    loadVideos();
  })

  return (
    <div>
      <form onSubmit={onsub}>
        <input
          type="text"
          placeholder="title"
          {...register("title", { required: true })}
        />
        {errors.title && <span>This field is required</span>}

        <input type="file" {...register("file_video", { required: true })} onChange={e=>{
          setFileName(e.target.files[0])
        }} />
        {errors.file_video && <span>This field is required</span>}

        <button>Save</button>
      </form>
    </div>
  );
}
