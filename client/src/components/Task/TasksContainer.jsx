import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import axios from "axios";
import { Edit, Trash } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import useTasks from "../../hooks/useTasks";
import useUpdateTaskCategory from "../../hooks/useUpdateTaskCategory";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import UpdateTaskModal from "./UpdateTaskModal";

const TasksContainer = () => {
  const api_url = import.meta.env.VITE_API_URL;

  // Get all tasks
  const [tasks, isLoading, refetch] = useTasks();

  // State for tasks
  const [taskData, setTaskData] = useState({
    "to-do": [],
    "in-progress": [],
    done: [],
  });

  // Update state when tasks are fetched
  useEffect(() => {
    if (tasks.length > 0) {
      setTaskData({
        "to-do": tasks.filter((task) => task.category === "to-do"),
        "in-progress": tasks.filter((task) => task.category === "in-progress"),
        done: tasks.filter((task) => task.category === "done"),
      });
    }
  }, [tasks]);

  // Use custom hook --> useUpdateTaskCategory
  const updateTaskCategory = useUpdateTaskCategory();

  // Handle Drag End
  const onDragEnd = useCallback(
    (result) => {
      const { source, destination, draggableId } = result;
      if (!destination) return;

      const sourceCategory = source.droppableId;
      const destCategory = destination.droppableId;

      if (
        sourceCategory === destCategory &&
        source.index === destination.index
      ) {
        return;
      }

      // Optimistically update UI
      setTaskData((prev) => {
        const updatedTasks = { ...prev };

        // Remove task from source
        const [movedTask] = updatedTasks[sourceCategory].splice(
          source.index,
          1
        );

        // Update category & insert into destination
        movedTask.category = destCategory;
        updatedTasks[destCategory].splice(destination.index, 0, movedTask);

        return updatedTasks;
      });

      // API update in background
      updateTaskCategory.mutate({
        taskId: draggableId,
        newCategory: destCategory,
      });
    },
    [updateTaskCategory, setTaskData]
  );

  // Delete task function
  const handleDelete = useCallback(
    async (id) => {
      toast("Are you sure you want to delete this task?", {
        position: "top-right",
        action: {
          label: "Yes, delete",
          onClick: async () => {
            try {
              const { data } = await axios.delete(
                `${api_url}/delete-task/${id}`
              );
              if (data.deletedCount) {
                refetch();
                toast.success("Your task has been deleted.", {
                  position: "top-right",
                });
              }
            } catch (error) {
              toast.error("Failed to delete the task", {
                description: error?.message,
                position: "top-right",
              });
            }
          },
        },
        cancel: {
          label: "Cancel",
        },
        style: {
          marginTop: "35px",
        },
      });
    },
    [api_url, refetch]
  );

  // Show loader
  if (isLoading) return <div className="bg-white h-screen dark:bg-[#020b3b]" />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Object.keys(taskData).map((category) => (
          <Droppable key={category} droppableId={category}>
            {(provided) => (
              <Card
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-4 mb-2 w-full h-fit min-h-[120px]"
              >
                <CardHeader className="flex flex-row justify-between items-center">
                  <CardTitle className="text-3xl font-[700] capitalize">
                    {category.replace("-", " ")}
                  </CardTitle>

                  {category === "to-do" && (
                    <Badge className="bg-gray-500 text-white">To Do</Badge>
                  )}
                  {category === "in-progress" && (
                    <Badge className="bg-yellow-500 text-white">
                      In Progress
                    </Badge>
                  )}
                  {category === "done" && (
                    <Badge className="bg-green-600 text-white">Done</Badge>
                  )}
                </CardHeader>
                <CardContent>
                  {taskData[category].map((task, index) => (
                    <Draggable
                      key={task._id.toString()}
                      draggableId={task._id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-4 mt-4 drop-shadow-sm shadow-sm shadow-gray-200 cursor-pointer border-gray-200 bg-gray-50"
                        >
                          <CardHeader className="p-0">
                            <CardDescription>{task?.timestamp}</CardDescription>
                            <CardTitle className="pt-1">
                              {task?.title}
                            </CardTitle>{" "}
                            <CardDescription className="line-clamp-7 text-base whitespace-pre-line">
                              {task?.description}
                            </CardDescription>
                          </CardHeader>

                          {/* Delete And Update Btn */}
                          <CardFooter className="p-0">
                            <div className="mt-4 flex items-start gap-2 w-full">
                              {/* Update Btn */}
                              <Button
                                onClick={() =>
                                  document
                                    .getElementById(`modal-${task?._id}`)
                                    .showModal()
                                }
                                variant="outline"
                                className="tooltip text-blue-500"
                                data-tip="Update Task"
                              >
                                <Edit size={30} />
                                {/* Update Modal */}
                                <UpdateTaskModal task={task} />
                              </Button>
                              {/* Delete Btn */}
                              <Button
                                variant="outline"
                                onClick={() => handleDelete(task?._id)}
                                className="tooltip text-destructive"
                                data-tip="Delete Task"
                              >
                                <Trash size={30} />
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                </CardContent>
                {provided.placeholder}
              </Card>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TasksContainer;
