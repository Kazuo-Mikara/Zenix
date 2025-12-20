import React from 'react';

const CourseSkeleton = () => {
    return (
        <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 animate-pulse">
            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-col gap-2">
                    <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md" />
                    <div className="h-1 w-full" />
                    <div className="h-4 w-1/2 bg-gray-100 dark:bg-gray-700/50 rounded-md" />
                </div>

                <div className="flex items-center justify-between mt-2">
                    <div className="h-5 w-16 bg-indigo-100/50 dark:bg-indigo-900/30 rounded-full" />
                    <div className="flex items-center gap-1">
                        <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const CourseGridSkeleton = ({ count = 6 }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(count)].map((_, i) => (
                <CourseSkeleton key={i} />
            ))}
        </div>
    );
};

export default CourseSkeleton;
