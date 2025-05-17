import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";

const useTasks = () => {
  const { user } = useAuth();
  const api_url = import.meta.env.VITE_API_URL;

  const {
    data: tasks = [],
    isLoading,
    refetch,
    isError
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get(`${api_url}/my-tasks/${user.email}`);
      return data;
    },
  });

  return [tasks, isLoading, refetch, isError];
};

export default useTasks;
