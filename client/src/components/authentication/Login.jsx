import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const api_url = import.meta.env.VITE_API_URL;
  const navigatePath = location.state?.pathname || "/";
  const { setUser, googleLogin } = useAuth();

  // function for google login --->
  const handleGoogleLogin = () => {
    googleLogin()
      .then(async (result) => {
        const currentUser = result.user;

        // save user data in db ----->
        await axios.post(`${api_url}/users`, {
          email: currentUser.email,
          name: currentUser?.displayName,
          photo: currentUser?.photoURL,
          userId: currentUser.uid,
        });

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
    <div className="w-full h-screen flex items-center justify-center bg-base-200 fixed top-0 left-0 z-50">
      <div
        id="login"
        className="w-[95%] sm:w-[85%] md:w-[65%] lg:w-[55%] xl:w-[40%] max-w-[640px] bg-[#fff] rounded-lg transition-all duration-300 border border-[#d1d1d1] p-8"
      >
        <div className="w-full flex p-4 justify-center border-b border-[#d1d1d1]">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome To Task-To-Do!</h1>
            <h3 className="mt-1 text-lg font-medium">
              Stay organized and boost your productivity with ease. Manage your
              tasks effortlessly and stay ahead of your goals. To access the
              app, you must be logged in.
            </h3>
          </div>
        </div>
        {/* Google Login Button */}
        <div className="my-4 flex justify-center items-center">
          <button
            onClick={() => handleGoogleLogin()}
            className="bg-primary text-white rounded-md py-[5px] px-6 flex items-center gap-[10px] text-[1rem] hover:bg-[#006eff] transition-all duration-500"
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

export default Login;
