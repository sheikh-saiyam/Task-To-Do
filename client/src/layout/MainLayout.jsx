import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 z-50 bg-white w-full drop-shadow-md">
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
