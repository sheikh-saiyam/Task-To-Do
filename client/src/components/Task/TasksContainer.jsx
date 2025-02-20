const TasksContainer = () => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="p-6 h-55 bg-white rounded-lg w-full shadow-sm">
        <h1 className="text-2xl font-semibold tracking-wide">To Do</h1>
      </div>
      <div className="p-6 h-55 bg-white rounded-lg w-full shadow-sm">
        <h1 className="text-2xl font-semibold tracking-wide">In Progress</h1>
      </div>
      <div className="p-6 h-55 bg-white rounded-lg w-full shadow-sm">
        <h1 className="text-2xl font-semibold tracking-wide">Done</h1>
      </div>
    </div>
  );
};

export default TasksContainer;
