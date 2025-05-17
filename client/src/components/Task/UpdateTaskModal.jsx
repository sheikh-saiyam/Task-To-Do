import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { MdError } from "react-icons/md";
import useTasks from "../../hooks/useTasks";
import { useState } from "react";
import { toast } from "sonner";

const UpdateTaskModal = ({ task, open, setOpen }) => {
  const [, , refetch] = useTasks();
  const api_url = import.meta.env.VITE_API_URL;
  const categoryOption = ["to-do", "in-progress", "done"];

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(task.category);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = selectedItem;

    // validations
    if (title.length > 50) {
      setLoading(false);
      return setError("Title should be less than 50 characters");
    }
    if (description.length > 300) {
      setLoading(false);
      return setError("Description should be less than 300 characters");
    }

    try {
      const { data } = await axios.put(`${api_url}/update-task/${task._id}`, {
        title,
        description,
        category,
      });

      if (data.modifiedCount) {
        refetch();
        setError("");
        setOpen(false);
        setLoading(false);
        toast.success("Task Updated Successfully!", {
          position: "top-right",
          style: {
            marginTop: "35px",
          },
        });
      } else {
        setError("");
        setOpen(false);
        setLoading(false);
        toast.info("No changes were made!", {
          position: "top-right",
          style: {
            marginTop: "35px",
          },
        });
      }
    } catch (error) {
      setError(error.message || "Error caught while update the task!");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-[95%] sm:max-w-[500px]">
        <DialogHeader className="mt-4 flex text-left justify-between">
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription>
            Update your task details below and save changes.
          </DialogDescription>
        </DialogHeader>{" "}
        <form onSubmit={handleSubmit}>
          {/* Task Title */}
          <div className="grid gap-2 py-2">
            <label htmlFor="title" className="text-sm font-medium">
              Task Title
            </label>
            <Input name="title" defaultValue={task.title} required />
          </div>

          {/* Task Description */}
          <div className="grid gap-2 py-2">
            <label htmlFor="description" className="text-sm font-medium">
              Task Description
            </label>
            <Textarea
              name="description"
              defaultValue={task.description}
              rows={5}
              required
            />
          </div>

          {/* Task Category */}
          <div className="grid gap-2 py-2">
            <label className="text-sm font-medium">Update Category</label>
            <Select value={selectedItem} onValueChange={setSelectedItem}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOption.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* error */}
          {error && (
            <div className="text-red-500 flex items-center gap-1">
              <MdError />
              {error}
            </div>
          )}

          {/* Submit */}
          <DialogFooter className="mt-4">
            <Button disabled={loading} type="submit" className="w-full">
              {loading ? (
                <span className="flex items-center gap-1">
                  <Loader2 />
                  Updating Task...
                </span>
              ) : (
                "Update Task"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTaskModal;
