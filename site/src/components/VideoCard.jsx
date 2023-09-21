import { useContext,useEffect } from "react";
import { AppContext } from "../context/AppContext";

function VideoCard() {
  const { videos } = useContext(AppContext);
  useEffect(()=>{
    console.log(videos.data)     
  },[])
  
  return (
    <div>
    {videos.data.map((video,id) => (
      <div key={id}>
        <h1>video.title</h1>
        <video width="320" height="240" controls>
            <source src={`../../../media/videos/${video.file_video}`} type="video/mp4"/>
        </video>
        <h1>video.description</h1>
      </div>
    ))} 
    </div>
  );
}

export default VideoCard;
