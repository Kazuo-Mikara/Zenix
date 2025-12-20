'use client';
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle({ showSystemOption = false, className = '' }) {
    const { theme, setTheme, toggleTheme } = useTheme();

    if (showSystemOption) {
        return (
            <div className={`flex items-center gap-1 p-6 rounded-lg bg-gray-200 dark:bg-gray-700 ${className} `}>
                <button
                    onClick={() => setTheme('light')}
                    className={`p-6 rounded-md transition-colors ${theme === 'light'
                        ? 'bg-white dark:bg-gray-600 shadow-sm'
                        : 'hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                    title="Light mode"
                >
                    <Sun className="w-10 h-10 text-yellow-500" />
                </button>
                <button
                    onClick={() => setTheme('dark')}
                    className={`p-6 rounded-md transition-colors ${theme === 'dark'
                        ? 'bg-white dark:bg-gray-600 shadow-sm'
                        : 'hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                    title="Dark mode"
                >
                    <Moon className="w-10 h-10 text-gray-700 bg-gray-200" />
                </button>
                <button
                    onClick={() => setTheme('system')}
                    className={`p-6 rounded-md transition-colors ${theme === 'system'
                        ? 'bg-white dark:bg-gray-600 shadow-sm'
                        : 'hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                    title="System preference"
                >
                    <Monitor className="w-10 h-10 text-gray-500 dark:text-gray-300" />
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors ${className}`}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {theme === 'dark' ? (
                <Sun className="w-10 h-10 text-yellow-500" />
            ) : (
                <Moon className="w-10 h-10 text-gray-500 bg-yellow-600" />
            )}
        </button>
    );
}

export function ThemeToggleIcon({ className = '' }) {
    const { theme, toggleTheme } = useTheme();

    const iconVariants = {
        enter: (direction) => ({
            y: direction > 0 ? -20 : 20, // Enter from top or bottom
            opacity: 0,
            rotate: direction > 0 ? -90 : 90, // Rotate opposite direction
        }),
        // Animation for when the icon is present
        center: {
            y: 0,
            opacity: 1,
            rotate: 0,
        },
        // Animation for when the icon exits (animate -> exit)
        exit: (direction) => ({
            y: direction > 0 ? 20 : -20, // Exit to top or bottom
            opacity: 0,
            rotate: direction > 0 ? 90 : -90, // Rotate to opposite direction
        }),
    };

    return (
        // <button
        //     onClick={toggleTheme}
        //     // Apply existing button styles and add 'relative' and 'overflow-hidden' for animation
        //     className={`relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors overflow-hidden ${className}`}
        //     title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        //     aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        // >
        //     <AnimatePresence mode="wait" initial={false}>
        //         {theme === 'dark' ? (
        //             <motion.div
        //                 key="sun-icon" // Unique key for AnimatePresence
        //                 custom={1}
        //                 variants={iconVariants}
        //                 initial="enter"
        //                 animate="center"
        //                 exit="exit"
        //                 transition={{ duration: 0.2 }}
        //                 className="absolute inset-0 flex items-center justify-center pointer-events-none" // Overlay and prevent click interference
        //             >
        //                 <Sun className="w-15 h-10 text-yellow-600" />
        //             </motion.div>
        //         ) : (
        //             <motion.div
        //                 key="moon-icon" // Unique key for AnimatePresence
        //                 custom={-1}
        //                 variants={iconVariants}
        //                 initial="enter"
        //                 animate="center"
        //                 exit="exit"
        //                 transition={{ duration: 0.2 }}
        //                 className="absolute inset-0 flex items-center justify-center pointer-events-none" // Overlay and prevent click interference
        //             >
        //                 <Moon className="w-15 h-10 text-gray-600" />
        //             </motion.div>
        //         )}
        //     </AnimatePresence>
        // </button>
        <button
            onClick={toggleTheme}
            className={`
                flex items-center w-16 h-8 rounded-full p-1 cursor-pointer 
                transition-colors duration-300 ease-in-out
                ${theme === 'dark' ? 'bg-gray-700' : 'bg-amber-500'}
                ${className}
            `}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme mode"
        >
            {/* Toggle Circle/Indicator */}
            <div
                className={`
                    w-8 h-8 rounded-full shadow-lg transform 
                    transition-transform duration-500 ease-in-out relative
                    ${theme === 'dark' ? 'translate-x-6 bg-gray-50' : 'translate-x-[-3px] bg-white'}
                `}
            >
                {/* Icons inside the circle for visual flair */}
                <div className={`absolute inset-0 flex items-center transition-transform duration-800 justify-center ${theme === 'dark' ? 'rotate-360' : 'rotate-0'} transform transition-all duration-300 ease-in-out`}>
                    {theme === 'dark' ? (
                        <Moon className="w-4 h-4 text-gray-500 " />
                    ) : (
                        <Sun className="w-4 h-4 text-amber-600" />
                    )}
                </div>
            </div>
        </button >
    );
}
