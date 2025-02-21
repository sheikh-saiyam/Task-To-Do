import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <div className="bg-primary dark:bg-[#020b3b] duration-500">
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
