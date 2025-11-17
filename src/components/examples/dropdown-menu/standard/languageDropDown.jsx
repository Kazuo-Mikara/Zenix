'use client';

import { ChevronDown } from "lucide-react";
import { Image } from "lucide-react";
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

export const title = "Language Dropdown Menu";

// --- 1. LANGUAGE DATA ARRAY (Moved outside component) ---
const LANGUAGES = [
    { value: "en", label: "English", flag: "https://catamphetamine.gitlab.io/country-flag-icons/3x2/US.svg" },
    { value: "es", label: "Spanish", flag: "https://catamphetamine.gitlab.io/country-flag-icons/3x2/ES.svg" },
    { value: "jp", label: "Japanese", flag: "https://catamphetamine.gitlab.io/country-flag-icons/3x2/JP.svg" },
    { value: "cn", label: "Chinese", flag: "https://catamphetamine.gitlab.io/country-flag-icons/3x2/CN.svg" },
    { value: "kr", label: "Korean", flag: "https://catamphetamine.gitlab.io/country-flag-icons/3x2/KR.svg" },
];

const LanguageDropDownMenu = ({ language, setLanguage }) => {
    const currentLang = LANGUAGES.find(lang => lang.value === language) || LANGUAGES[0];
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <img
                        src={currentLang.flag}
                        alt={currentLang.label}
                        width={20}
                        height={20}
                        className="rounded"
                        style={{ width: '20px', height: '20px' }}
                    />

                    {currentLang.label}
                    <ChevronDown className="h-4 w-4 ml-1 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup onValueChange={setLanguage} value={language}>
                    {LANGUAGES.map((lang) => (
                        <DropdownMenuRadioItem
                            key={lang.value}
                            value={lang.value}
                            className="flex items-center gap-3"
                        >
                            <img
                                src={lang.flag}
                                alt={lang.label}
                                width={20}
                                height={20}
                                className="rounded"
                                style={{ width: '20px', height: '20px' }}
                            />
                            {lang.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageDropDownMenu;