import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PublicRoutes, PrivateRoutes } from "./routes/routes.js";
import {
  Home,
  CreateAccount,
  CourseVideos,
  AdminPanel,
  NotFound,
  Login,
} from "./pages";
import {
  ProtectedRoutes,
  ProtectedRoutesAdmin,
} from "./security/protectedRoute.js";
import { AppContext } from "./context/AppContext";
import { useContext } from "react";
function App() {
  const { isLogged } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Navigate to={PublicRoutes.LOGIN} />} />

        <Route element={<ProtectedRoutes />}>
          <Route path={PrivateRoutes.HOME} element={<Home />} />
          <Route path={PrivateRoutes.COURSES} element={<CourseVideos />} />
          <Route element={<ProtectedRoutesAdmin />}>
            <Route
              path={PrivateRoutes.CREATE_ACCOUNT}
              element={<CreateAccount />}
            />
            <Route path={PrivateRoutes.ADMIN_PANEL} element={<AdminPanel />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
        {/* <Route path="/" element={<AdminPanel/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
