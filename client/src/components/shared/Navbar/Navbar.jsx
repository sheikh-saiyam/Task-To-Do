import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useAuth from "@/hooks/useAuth";
import { LayoutDashboard, LogOut, Menu, Moon, Plus, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";
import AddTaskModal from "@/components/Task/AddTaskModal";
import { useState } from "react";
import { User } from "lucide-react";
import { FaTasks } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
  const pathname = useLocation();
  const { user, logOut } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = pathname.pathname;
  const routes = [
    {
      href: "/",
      label: "Dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      active: location === "/",
    },
  ];

  return (
    <nav className="w-11/12 mx-auto max-w-[1920px]">
      <div className="flex h-16 items-center">
        <div className="flex items-center gap-4">
          {/* <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <div className="grid gap-2 py-6">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                      route.active
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    {route.icon}
                    {route.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet> */}

          <Link href="/" className="hidden md:flex items-center gap-2">
            {/* <img
              src="https://i.ibb.co.com/TxNBJ5pW/todo.png"
              alt="Task To Do logo"
              className="h-20 w-20 rounded-md shadow-sm"
            /> */}
            <Button
              variant="outline"
              className="hidden text-xl font-bold md:flex items-center gap-2"
            >
              {" "}
              <FaTasks className="mt-0.5" />
              Task To Do
            </Button>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end pr-6">
          <nav className="flex items-center space-x-2.5">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  route.active
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                {route.icon}
                {route.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className={`flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted`}
            >
              <Plus />
              Add Task
            </button>
          </nav>
        </div>

        <Separator orientation="vertical" className="-ml-2 mr-4" />

        {/* user dropdown */}
        <div className="flex items-center gap-3">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user.photoURL || "/placeholder.svg"}
                      alt={user.displayName}
                      referrerPolicy="no-referrer"
                    />
                    <AvatarFallback>
                      {user.displayName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.displayName}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="h-4 w-4 mr-0.5" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={logOut}
                >
                  <LogOut className="mr-0.5 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Button variant="outline" size="icon" className="hidden md:flex">
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
      {/* Add Task Modal */}
      <AddTaskModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </nav>
  );
}
