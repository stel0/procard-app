import {useContext} from 'react'
import {AppContext} from '../context/AppContext'

export function VideoCard() {

  const {videos} = useContext(AppContext);

  return (
    <div>
      {videos.map((video) => (
        <div key={video.id}>
            <h1>{video.title}</h1>
            <h1>{video.upload_date}</h1>
            <h1>{video.file_video}</h1>
        </div>
      ))}
    </div>
  );
}
