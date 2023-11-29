import { useEffect, useState , useContext} from "react";
import { getVideos } from "../api/video.api";
import { AppContext} from '../context/AppContext';

function VideoCard() {
  const {user_info} = useContext(AppContext);

  const [videos, setVideos] = useState(null);

  useEffect(() => {
    getVideos(user_info)
      .then((res) => {
        console.log(res.data);
        res.data && setVideos(res.data);
      })
      .catch((e) => {
        console.error(e);
      });

  }, []);

  return (
    <div>
      {!videos && <h1>Loading...</h1>}
      {videos &&
        videos.map((video, id) => (
          <div key={id}>
            <h1>{video.title}</h1>
            <video width="750" height="500" controls>
              {<source
                src={`../../../media${video.file_video}`}
                type="video/mp4"
              />}
            </video>
            <h1>{video.description}</h1>
          </div>
        ))}
    </div>
  );
}

export default VideoCard;
