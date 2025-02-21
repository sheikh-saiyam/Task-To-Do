import { RxCross1 } from "react-icons/rx";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import useTasks from "../../hooks/useTasks";

const AddTaskModal = ({ isModalOpen, setIsModalOpen }) => {
  const { user } = useAuth();
  const [, , refetch] = useTasks();
  const api_url = import.meta.env.VITE_API_URL;

  // Function for post task in db --->
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const task = {
      title,
      description,
      category: "to-do",
      timestamp: new Date().toLocaleString(),
      email: user.email,
      username: user.displayName,
    };
    try {
      // Post task in db --->
      const { data } = await axios.post(`${api_url}/add-task`, task);
      // Show Success Modal --->
      if (data.insertedId) {
        refetch();
        form.reset();
        setIsModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "Task Added In To-Do List",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    }
  };
  return (
    <div
      className={`${
        isModalOpen ? "visible" : "invisible"
      } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#171717b9] transition-all duration-300 flex items-center justify-center`}
    >
      <div
        className={`${
          isModalOpen ? "scale-[1] opacity-100" : "scale-[0] opacity-0"
        } w-[90%] sm:w-[80%] md:w-[65%] lg:w-[40%] bg-[#fff] rounded-lg transition-all duration-300 mx-auto mt-8`}
      >
        <div className="w-full flex p-4 justify-between border-b border-[#d1d1d1]">
          <div>
            <h1 className="mt-[2px] text-[1.5rem] font-bold">Add A Task</h1>
            <h3 className="mt-1 text-base font-medium">
              Stay organized and manage your tasks efficiently. Fill in the
              details below to add a new task.
            </h3>
          </div>
          <RxCross1
            className="p-1 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
        {/* Task Form  */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Task Title */}
          <div className="w-full md:w-[100%]">
            <label htmlFor="title" className="text-[15px] text-text font-[500]">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
            />
          </div>
          {/* Title Description */}
          <div className="w-full md:w-[100%]">
            <label
              htmlFor="description"
              className="font-[500] text-[15px] text-text"
            >
              Description
            </label>
            <textarea
              name="description"
              placeholder="Task Description"
              className="border-border border rounded-md outline-none mt-1 px-4 w-full py-3 min-h-[200px] focus:border-primary transition-colors duration-300"
            />
          </div>
          {/* Submit Button */}
          <div className="w-2/3 mx-auto">
            <button
              type="submit"
              className="btn w-full hover:bg-[#006eff] bg-primary text-white font-semibold "
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
