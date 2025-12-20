"use client";

import { ChevronDown } from "lucide-react";
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

const levelDropdownMenu = ({ level, setLevel }) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    Level : {level}
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Level</DropdownMenuLabel>
                <DropdownMenuSeparator className="border " />
                <DropdownMenuRadioGroup onValueChange={setLevel} value={level}>
                    <DropdownMenuRadioItem value="Beginner">Beginner</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Intermediate">Intermediate</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Advanced">Advanced</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Default">Default</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default levelDropdownMenu;
