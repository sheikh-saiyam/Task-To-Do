import Login from "../components/authentication/Login";
import Loader from "../components/Loader/Loader";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (user && user.email) return children;
  if (loading) return <Loader />;
  return <Login />;
};

export default PrivateRoute;
