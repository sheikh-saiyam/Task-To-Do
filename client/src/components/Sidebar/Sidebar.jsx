import { useState } from "react";
import { GoTasklist } from "react-icons/go";
import { MdDashboard } from "react-icons/md";
import AddTaskModal from "../Task/AddTaskModal";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      {/* Header */}
      <div>
        <h1 className="text-center text-2xl font-bold text-white tracking-widest underline underline-offset-2 flex items-center gap-2 justify-center">
          <GoTasklist className="mt-1" size={40} />
          Task To Do
        </h1>
      </div>
      {/* NavLinks */}
      <div className="mt-4 flex flex-col items-center gap-4">
        {/* Dashboard */}
        <div className="bg-white text-primary font-semibold border-2 border-white text-lg py-1 px-4 flex items-center gap-2 w-full cursor-pointer">
          <MdDashboard size={25} />
          Dashboard
        </div>
        {/* Add Task Button */}
        <div
          className="bg-white text-primary font-semibold border-2 border-white text-lg py-1 px-4 flex items-center gap-2 w-full cursor-pointer tracking-widest hover:underline underline-offset-2 duration-300"
          onClick={() => setIsModalOpen(true)} // Open modal on click
        >
          <GoTasklist size={25} />
          Add Task
        </div>
        {/* Add Task Modal */}
        <AddTaskModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </div>
  );
};

export default Sidebar;
