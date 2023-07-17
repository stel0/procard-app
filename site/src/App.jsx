import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import { Home, NotFound, VideosPage, AdminPage ,Landing,CrearCuenta} from "./pages";

function App() {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/crear-cuenta" element={<CrearCuenta />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cursos" element={<VideosPage />} />
        <Route path="/panel-admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App