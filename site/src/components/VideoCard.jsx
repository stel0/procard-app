import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function VideoCard() {
  const { videos } = useContext(AppContext);

  return (
    <div>
      {videos.map((video) => (
        <div key={video.id}>
          <br />
          <h1>{video.title}</h1>
          <h1>{video.upload_date}</h1>
          <h1>{video.file_video}</h1>
          <br />
        </div>
      ))}
    </div>
  );
}

export default VideoCard;
