import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useTasks from "../../hooks/useTasks";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { MdError } from "react-icons/md";
import { toast } from "sonner";

const AddTaskModal = ({ isModalOpen, setIsModalOpen }) => {
  const { user } = useAuth();
  const [, , refetch] = useTasks();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const api_url = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;

    // validations
    if (title.length > 50) {
      setLoading(false);
      return setError("Title should be less than 50 characters");
    }
    if (description.length > 300) {
      setLoading(false);
      return setError("Description should be less than 300 characters");
    }

    const task = {
      title,
      description,
      category: "to-do",
      timestamp: new Date().toLocaleString(),
      email: user.email,
      username: user.displayName,
    };

    try {
      const { data } = await axios.post(`${api_url}/add-task`, task);
      if (data.insertedId) {
        refetch();
        form.reset();
        setError("");
        setLoading(false);
        setIsModalOpen(false);
        toast.success("Task Added In To-Do List", {
          position: "top-right",
          style: {
            marginTop: "35px",
          },
        });
      }
    } catch (error) {
      setError(error.message || "Error caught while add task!");
      setLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="mt-4 flex justify-between">
          <div>
            <DialogTitle>Add A Task</DialogTitle>
            <DialogDescription className="mt-1">
              Stay organized and manage your tasks efficiently. Fill in the
              details below to add <br /> a new task.
            </DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Title */}
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="Task Title"
              id="title"
              required
            />
          </div>
          {/* Task Description */}
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Task Description"
              required
              rows={5}
            />
          </div>

          {/* error */}
          {error && (
            <div className="text-red-500 flex items-center gap-1">
              <MdError />
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? (
              <span className="flex items-center gap-1">
                <Loader2 />
                Adding Task...
              </span>
            ) : (
              "Add Task"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
