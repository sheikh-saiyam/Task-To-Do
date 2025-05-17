import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TaskSkeleton = () => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="p-4 mb-2 w-full h-fit min-h-[120px]">
          <CardHeader className="flex flex-row justify-between items-center">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-16" />
          </CardHeader>

          <CardContent className="space-y-4">
            {[...Array(3)].map((_, j) => (
              <Card key={j} className="p-4 bg-gray-50 border shadow-sm">
                <CardHeader className="p-0 space-y-2">
                  <Skeleton className="h-3 w-24" /> {/* timestamp */}
                  <Skeleton className="h-5 w-3/4" /> {/* title */}
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-4 w-[80%]" />
                </CardHeader>

                <CardFooter className="p-0 mt-4 flex gap-2">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <Skeleton className="h-10 w-10 rounded-md" />
                </CardFooter>
              </Card>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskSkeleton;
