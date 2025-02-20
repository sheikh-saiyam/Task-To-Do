import { useState } from "react";
import LoginModal from "../../authentication/Login";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between w-full relative bg-white rounded-full px-[10px] py-[8px]">
      {/* logo */}
      <img
        src="https://i.ibb.co.com/TxNBJ5pW/todo.png"
        alt="Task To Do logo"
        className="w-[70px] shadow rounded-[20px] shadow-primary"
      />

      <div className="flex items-center gap-6">
        {/* nav links */}
        <ul className="items-center gap-[20px] text-[1rem] text-[#424242] flex">
          <li className="before:w-0 hover:before:w-full before:bg-primary before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-primary transition-all duration-300 before:left-0 cursor-pointer capitalize">
            home
          </li>
          <li className="before:w-0 hover:before:w-full before:bg-primary before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-primary transition-all duration-300 before:left-0 cursor-pointer capitalize">
            blogs
          </li>
        </ul>

        {/* login/logout button */}
        <div className="items-center gap-[10px] flex">
          <button
            className="py-[7px] text-[1rem] px-[16px] rounded-full capitalize bg-primary text-white hover:bg-blue-400 transition-all duration-300 flex"
            onClick={() => setIsModalOpen(true)}
          >
            Login
          </button>
          {/* LoginModal (conditionally rendered) */}
          <LoginModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
