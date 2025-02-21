import useAuth from "../../../hooks/useAuth";
import { IoMenu } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";

const Navbar = () => {
  const { user, logOut } = useAuth();
  return (
    <nav className="px-[20px] mx-auto py-4 flex items-center justify-between relative border-b-2 border-white">
      {/* logo */}
      <img
        src="https://i.ibb.co.com/TxNBJ5pW/todo.png"
        alt="Task To Do logo"
        className="w-[70px] shadow rounded-[20px] shadow-primary"
      />

      <div className="flex items-center gap-6">
        {/* Profile */}
        <div className="items-center gap-[10px] flex">
          {user && (
            <div className="dropdown hover:dropdown-open dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn flex items-center bg-white border-none duration-300 hover:text-white rounded-full avatar text-primary hover:bg-[#0f9fff]"
              >
                <div>
                  <span>
                    <IoMenu size={35} />
                  </span>
                </div>
                <div className="w-10 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    alt={user?.displayName}
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded mt-1 z-10 w-max p-4 shadow border"
              >
                <div className="flex gap-4 items-start">
                  <div>
                    <img
                      referrerPolicy="no-referrer"
                      className="mx-auto w-14 h-14 rounded-full mt-[7px] mb-2"
                      src={user?.photoURL}
                      alt={user?.displayName}
                    />
                  </div>
                  <div>
                    <p className="font-semibold my-1">{user?.displayName}</p>
                    <p className="font-semibold my-1">{user.email}</p>
                    {/* Logout Button */}
                    <div className="w-full mt-3">
                      <button
                        onClick={logOut}
                        className="btn  duration-300  rounded w-full btn-sm bg-white text-primary hover:bg-primary hover:text-white border-primary hover tracking-wide text-lg font-semibold"
                      >
                        <SlLogout /> Logout
                      </button>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
