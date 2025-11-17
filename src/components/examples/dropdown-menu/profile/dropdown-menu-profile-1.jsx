"use client";
import { HelpCircle, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export const title = "Profile Dropdown with Avatar";
const ProfileDropDown = ({ name, email, image, onLogout }) => {
  const handleLogoutClick = () => {
    // We use a check to ensure the prop was actually passed and is callable
    if (typeof onLogout === 'function') {
      onLogout(); // This executes the function provided by the parent
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-10 w-10 rounded-full" variant="ghost">
          <Avatar>
            <AvatarImage alt={name} src={image} />
            <AvatarFallback>{name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm leading-none">{name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="#">
          <DropdownMenuItem>
            <User />
            Profile
          </DropdownMenuItem>
        </Link>
        <Link href="#">
          <DropdownMenuItem>
            <Settings />
            Settings
          </DropdownMenuItem>
        </Link>
        <Link href="#">
          <DropdownMenuItem>
            <HelpCircle />
            Help
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" onClick={() => handleLogoutClick()}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default ProfileDropDown;
