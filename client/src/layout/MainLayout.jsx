import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <div className="w-11/12 md:w-10/12 lg:w-9/12 mx-auto py-4">
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
