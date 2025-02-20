import { RxCross1 } from "react-icons/rx";
import useAuth from "./../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginModal = ({ isModalOpen, setIsModalOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigatePath = location.state?.pathname || "/";
  const { setUser, googleLogin } = useAuth();
  // function for google login --->
  const handleGoogleLogin = () => {
    googleLogin()
      .then(async (result) => {
        const currentUser = result.user;
        // save user data in db ----->
        // await axios.post(`${api_url}/users`, {
        //   email: currentUser.email,
        //   name: currentUser?.displayName,
        //   photo: currentUser?.photoURL,
        // });

        setUser(currentUser);
        navigate(navigatePath);
        // for login modal
        Swal.fire({
          icon: "success",
          title: `Welcome \n ${currentUser.displayName}!`,
          showConfirmButton: false,
          background: "#f0f8ff",
          color: "#4B0082",
          timer: 3000,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
        });
      });
  };
  return (
    <div
      className={`${
        isModalOpen ? "visible" : "invisible"
      } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] transition-all duration-300 flex items-center justify-center`}
    >
      <div
        className={`${
          isModalOpen ? "scale-[1] opacity-100" : "scale-[0] opacity-0"
        } w-[90%] sm:w-[80%] md:w-[35%] bg-[#fff] rounded-lg transition-all duration-300 mx-auto mt-8`}
      >
        <div className="w-full flex p-4 justify-between border-b border-[#d1d1d1]">
          <div>
            <h1 className="text-[1.5rem] font-bold">Welcome To Task-To-Do!</h1>
            <h3 className="mt-1 text-base font-medium">
              Stay organized and boost your productivity—sign in to manage your
              tasks effortlessly.
            </h3>
          </div>
          <RxCross1
            className="p-2 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
        {/* Google Login Button */}
        <div className="my-4 flex justify-center items-center">
          <button
            onClick={() => {
              handleGoogleLogin();
              setIsModalOpen(false);
            }}
            className="bg-[#3B9DF8] text-white rounded-md py-[5px] px-6 flex items-center gap-[10px] text-[1rem] hover:bg-blue-500 transition-all duration-300"
          >
            <div className="p-2 rounded-full bg-white">
              <img
                src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png"
                alt="google logo"
                className="w-[23px]"
              />
            </div>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
