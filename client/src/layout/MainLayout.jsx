import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <div className="bg-[#006eff]">
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
