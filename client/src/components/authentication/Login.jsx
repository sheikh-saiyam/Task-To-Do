import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Button } from "../ui/button";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { toast } from "sonner";

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

        // for login modal
        toast.success(`Welcome back, ${currentUser.displayName}!`, {
          description: "You're now logged in and ready to manage your tasks!",
          position: "top-right",
          duration: 5000,
          style: {
            marginTop: "35px",
          },
        });

        navigate(navigatePath);
      })
      .catch((error) => {
        toast.error("Authentication failed!", {
          description: error.message || "Please try again later.",
          position: "top-right",
          style: {
            marginTop: "10px",
          },
        });
      });
  };
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50 fixed top-0 left-0 z-50">
      <Card
        id="login"
        className="w-[95%] sm:w-[85%] md:w-[65%] lg:w-[55%] xl:w-[40%] max-w-[640px] p-6"
      >
        <div className="w-full flex p-4 justify-center border-b border-[#d1d1d1]">
          <div className="text-center">
            <CardTitle className="text-lg xs:text-2xl">
              Welcome To Task-To-Do!
            </CardTitle>
            <CardDescription className="mt-2 text-[12px] xs:text-[18px] font-medium">
              Stay organized and boost your productivity with ease. Manage your
              tasks effortlessly and stay ahead of your goals. To access the
              app, you must be logged in.
            </CardDescription>
          </div>
        </div>
        {/* Google Login Button */}
        <div className="my-4 flex justify-center items-center">
          <Button onClick={() => handleGoogleLogin()}>
            <div className="p-1 rounded-full bg-white">
              <img
                src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png"
                alt="google logo"
                className="w-[20px]"
              />
            </div>
            Sign in with Google
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
