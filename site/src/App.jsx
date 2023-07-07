import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import {VideosPage} from './pages/VideosPage'
import { VideoFormPage } from "./pages/VideoFormPage";
import { Nav } from './components/Nav';

function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={< Navigate to="/videos"/>} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/videos-create" element={<VideoFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App