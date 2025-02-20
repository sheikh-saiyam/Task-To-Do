import { useState } from "react";
import { MdClose } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import Sidebar from "./../components/Sidebar/Sidebar";
import useAuth from "../hooks/useAuth";
import TasksContainer from "../components/Task/TasksContainer";

const HomeLayout = () => {
  const { user } = useAuth();
  // for responsive menu close & open --->
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <div className="w-full flex">
      {/* left side navigation panel */}
      <div
        className={`fixed xl:relative top-0 ${
          isSidebarOpen ? "left-0" : "-left-full"
        } xl:left-0 min-w-2/12 xl:w-3/12 max-w-[300px] md:max-w-[360px] min-h-screen  bg-primary p-6 transition-all duration-500 z-50`}
      >
        <Sidebar onToggleSidebar={toggleSidebar} />
      </div>
      {/* right side dashboard content */}
      <div className="w-full bg-gray-100">
        {/* Mobile menu open & close button */}
        <button
          className="xl:hidden p-3 text-primary bg-white shadow-lg border absolute top-28 right-4 z-50"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <MdClose size={27} className="text-primary" />
          ) : (
            <IoMenu size={27} className="text-primary" />
          )}
        </button>
        {/* Mobile menu open & close button */}
        <div className="p-8 bg-base-200 h-full">
          {/* Header */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-widest">
              Welcome, {user?.displayName}
            </h1>
            <h1 className="w-full md:w-2/3 mt-2 text-lg md:text-xl font-medium tracking-wide">
              Easily add, update, delete, and view your tasks in one place. Stay
              organized and boost your productivity!
            </h1>
          </div>
          {/* Tasks Container */}
          <div className="mt-8">
            <TasksContainer></TasksContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
