"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const title = "Dropdown with Radio Items";

const CoursePlatformDropDownMenu = ({ coursePlatform, setCoursePlatform }) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    Course Platform : {coursePlatform}
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Course Platform</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup onValueChange={setCoursePlatform} value={coursePlatform}>
                    <DropdownMenuRadioItem value="Udemy">Udemy</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Coursera">Coursera</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="edX">edX</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Skillshare">SkillShare</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CoursePlatformDropDownMenu;
