import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-9xl font-bold">404</h1>
      <p className="text-5xl font-medium mt-3">Oops! Page Not Found</p>
      <Link to="/">
        <button className="btn rounded bg-primary hover:bg-primary hover:scale-105 border-none text-white font-semibold mt-10">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
