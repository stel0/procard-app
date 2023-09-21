import { VideoForm,VideosList } from "../components";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function AdminPage() {
  const  {videos} = useContext(AppContext);
  return (
    <>
      <h1>AdminPage</h1>
      <div>
        <VideoForm />
      </div>
      <VideosList/>
    </>
  );
}

export default AdminPage;
