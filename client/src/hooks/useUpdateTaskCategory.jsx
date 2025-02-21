import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useUpdateTaskCategory = () => {
  const queryClient = useQueryClient();
  const api_url = import.meta.env.VITE_API_URL;

  return useMutation({
    mutationFn: async ({ taskId, newCategory, newTimestamp }) => {
      const { data } = await axios.patch(
        `${api_url}/update-task-category/${taskId}`,
        {
          category: newCategory,
          timestamp: newTimestamp,
        }
      );
      return data;
    },
    onMutate: async ({ taskId, newCategory }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (oldTasks) =>
        oldTasks.map((task) =>
          task._id === taskId ? { ...task, category: newCategory } : task
        )
      );

      return { previousTasks };
    },
    onError: (_, __, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export default useUpdateTaskCategory;
