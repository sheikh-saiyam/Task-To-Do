import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import Loader from "../Loader/Loader";
import useTasks from "../../hooks/useTasks";

const TasksContainer = () => {
  const api_url = import.meta.env.VITE_API_URL;

  // Get all tasks --->
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

  // Handle Drag End
  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCategory = source.droppableId;
    const destCategory = destination.droppableId;

    if (sourceCategory === destCategory && source.index === destination.index) {
      return;
    }

    // Copy state
    const updatedTasks = { ...taskData };

    // Remove task from source
    const [movedTask] = updatedTasks[sourceCategory].splice(source.index, 1);

    // Update category & add to destination
    movedTask.category = destCategory;
    updatedTasks[destCategory].splice(destination.index, 0, movedTask);

    // Update State
    setTaskData(updatedTasks);

    // Update category in Database
    const { data } = await axios.patch(
      `${api_url}/update-task-category/${movedTask._id}`,
      {
        category: destCategory,
      }
    );
    if (data.modifiedCount) {
      refetch();
    }
  };

  if (isLoading) return <Loader />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Object.keys(taskData).map((category) => (
          <Droppable key={category} droppableId={category}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-6 bg-white rounded-lg w-full shadow-sm h-fit min-h-[120px]"
              >
                <h1 className="text-2xl font-semibold tracking-wide capitalize">
                  {category.replace("-", " ")}
                </h1>
                {taskData[category].map((task, index) => (
                  <Draggable
                    key={task._id.toString()}
                    draggableId={task._id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-gray-200 p-4 mt-4 rounded-md drop-shadow shadow shadow-gray-300 cursor-pointer border-gray-200"
                      >
                        <h1 className="text-xl md:text-2xl font-semibold tracking-wider">
                          {task.title}
                        </h1>
                        <h3 className="text-lg mt-2 font-normal tracking-wide text-gray-700 whitespace-pre-line">
                          {task.description}
                        </h3>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TasksContainer;
