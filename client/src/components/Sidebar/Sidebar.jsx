import { GoTasklist } from "react-icons/go";
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
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
        <div className="bg-white text-primary font-semibold border-2 border-white text-lg py-1 px-4 flex items-center gap-2 w-full cursor-pointer">
          <MdDashboard size={25} />
          Dashboard
        </div>
        <div className="bg-white text-primary font-semibold border-2 border-white text-lg py-1 px-4 flex items-center gap-2 w-full cursor-pointer tracking-widest">
          <GoTasklist size={25} />
          Add Task
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
