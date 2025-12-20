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

const SortByDropDownMenu = ({ sorting, setSorting }) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    Sort By : {sorting}
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup onValueChange={setSorting} value={sorting}>
                    <DropdownMenuRadioItem value="Popularity">Popularity</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Price">Price</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Rating">Rating</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Newest">Newest</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="CourseName">Course Name</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SortByDropDownMenu;
