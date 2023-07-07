import {Link} from 'react-router-dom'


export function Nav() {
  return (
    <div>
      <Link to="/videos">Video app</Link>
      <Link to="/videos-create">Cargar video</Link>
    </div>
  )
}
