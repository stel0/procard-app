import { BrowserRouter, Routes, Route, Navigate,useNavigate } from "react-router-dom";
import { PublicRoutes, PrivateRoutes } from "./routes/routes.js";
import {
  Home,
  CreateAccount,
  CourseVideos,
  AdminPanel,
  NotFound,
  Login,
} from "./pages";
import ProtectedRoutes from './ProtectedRoutes.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={PublicRoutes.LOGIN} />} />
        <Route path={PublicRoutes.LOGIN} element={<Login />} />
        <Route
          path={PrivateRoutes.CREATE_ACCOUNT}
          element={<CreateAccount />}
        />
        <Route element={<ProtectedRoutes />}>
          <Route path={PrivateRoutes.HOME} element={<Home />} />
          <Route path={PrivateRoutes.COURSES} element={<CourseVideos />} />
        </Route>
        <Route path={PrivateRoutes.ADMIN_PANEL} element={<AdminPanel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
