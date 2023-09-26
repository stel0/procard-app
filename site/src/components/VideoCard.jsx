import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
function VideoCard() {
  const { videos } = useContext(AppContext);
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    console.log(videos);
    setPaths(
      videos.map((video) => {
        name: `../../../media${video.file_video}`;
      })
    );
  }, []);

  return (
    <div>
      {videos.map((video, id) => (
        <div key={id}>
          <h1>{video.title}</h1>
          <video width="750" height="500" controls>
            <source
              src={`../../../media${video.file_video}`}
              type="video/mp4"
            />
          </video> 
          <h1>{video.description}</h1>
        </div>
      ))}
    </div>
  );
}

export default VideoCard;
