import { useState } from "react";
import { MdClose } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import Sidebar from "./../components/Sidebar/Sidebar";
import TasksContainer from "../components/Task/TasksContainer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddTaskModal from "@/components/Task/AddTaskModal";

const HomeLayout = () => {
  const { user } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="w-full flex h-screen">
      {/* left side navigation panel */}

      {/* <div
        className={`fixed xl:relative top-0 ${
          isSidebarOpen ? "left-0" : "-left-full"
        } xl:left-0 min-w-2/12 xl:w-3/12 max-w-[300px] md:max-w-[360px] min-h-screen  bg-primary dark:bg-[#020b3b] p-6 transition-all duration-500 z-50`}
      >
        <Sidebar onToggleSidebar={toggleSidebar} setIsSidebarOpen={setIsSidebarOpen}/>
      </div> */}

      {/* right side dashboard content */}
      <div className="w-full bg-gray-50">
        {/* Mobile menu open & close button */}

        {/* <button
          className="xl:hidden p-3 text-primary bg-white shadow-lg border absolute top-[26px] right-[190px] rounded-xl z-50 tooltip tooltip-bottom"
          data-tip="Open Sidebar"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <MdClose size={27} className="text-primary" />
          ) : (
            <IoMenu size={27} className="text-primary" />
          )}
        </button> */}

        {/* Main content */}
        <div className="pt-24 pb-10 w-11/12 mx-auto max-w-[1920px] bg-gray-50 h-full dark:bg-[#020825]">
          {/* Header */}
          <div className="dark:text-white duration-500 space-y-2">
            <h1 className="scroll-m-20 text-2xl xs:text-3xl font-extrabold text-black/85">
              Welcome, {user?.displayName}
            </h1>
            <p className="leading-7 xs:text-lg md:text-xl text-gray-950 max-w-2xl">
              Easily add, update, delete, and view your tasks in one place. Stay
              organized and boost your productivity!
            </p>
          </div>

          <div className="mt-4 md:mt-2 flex justify-end ">
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <Plus /> Add Task
            </Button>
          </div>
          <Separator className="w-full mt-4" />

          {/* Tasks Container */}
          <div className="mt-8">
            <TasksContainer />
          </div>
        </div>
      </div>
      {/* AddTaskModal */}
      <AddTaskModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default HomeLayout;
