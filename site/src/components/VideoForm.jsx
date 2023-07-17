import { useForm } from "react-hook-form";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

function VideoFormPage() {
  const { submitForm } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submitVideoForm(data) {
    submitForm(data, "video");
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitVideoForm)}>
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

export default VideoFormPage;
