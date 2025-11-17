'use client'

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import getUsers from '@/helpers/(admin)/users/getAllUsers';
import deleteCourse from '@/helpers/(admin)/courses/deleteCourse';
import Loading from '../../components/loading';
import { useRouter, } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast'
import { Trash2, Pencil, ArrowUp, ArrowDown, ArrowUpDown, SearchIcon, DeleteIcon } from 'lucide-react';
// --- Placeholder/Mock Dependencies for compilation ---

// Mocking Next.js hooks for this environment
// const useRouter = () => ({ push: (url) => console.log('Simulating navigation to:', url) });
const useSearchParams = () => {
    // Mocking search params for the common cases
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    return params;
};
const usePathname = () => (typeof window !== 'undefined' ? window.location.pathname : '/admin_dashboard/courses');



// Mocking the getCourses API call helper

// Mocking the Link component to use standard anchor tags
const Link = ({ href, children, ...props }) => (
    <a href={href} {...props}>{children}</a>
);

// Lucide icons


const page = () => {
    const router = useRouter();
    // --- Hooks ---
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // State for filtering
    const [coursePlatform] = useState('Total');

    // State for total count (updated after data fetch)
    const [userCount, setUserCount] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    // Read URL parameters for current state
    const pageNumber = parseInt(searchParams.get('page')) || 1;
    const sortField = searchParams.get('sortField');
    const sortOrder = searchParams.get('sortOrder') || 'default';
    const currentPerPage = parseInt(searchParams.get('perPage')) || 25;
    // const [currentPerPage, setCurrentPerPage] = useState(25);

    // --- Pagination Calculation (Derived State) ---
    // Use courseCount from state, defaulting to 0
    const totalPages = Math.ceil(userCount / currentPerPage);
    const prevPage = pageNumber - 1 > 0 ? pageNumber - 1 : 1;
    const nextPage = pageNumber + 1;

    const pageNumbers = [];
    const offsetNumber = 3;
    for (let i = pageNumber - offsetNumber; i <= pageNumber + offsetNumber; i++) {
        if (i >= 1 && i <= totalPages) {
            pageNumbers.push(i);
        }
    }

    // --- React Query Fetching ---
    // Added refetch to the data destructuring to ensure it's available if needed, though not strictly required for this fix.
    const { data: data = { users: [], userCount: 0 }, isLoading, isError, refetch } = useQuery({
        // Query key changes whenever pageNumber, currentPerPage, sortField, or sortOrder changes,
        // triggering a new fetch based on the URL state.
        queryKey: ['users', currentPerPage, pageNumber, sortField, sortOrder],
        queryFn: () => getUsers({
            page: pageNumber,
            perPage: currentPerPage,
            coursePlatform: coursePlatform,
            sortField: sortField,
            sortOrder: sortOrder === 'default' ? null : sortOrder,
        }),
    });
    // 2. State for the filtered list displayed to the user
    const [filteredUsers, setFilteredUsers] = useState(data.users);
    // 3. State for the current value in the search input field
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (query) => {
        // 1. Update the search term state immediately
        setSearchTerm(query);

        // 2. Normalize the query for case-insensitive searching
        const normalizedQuery = query.toLowerCase().trim();

        if (normalizedQuery === '') {
            // If the search field is empty, show the original, full list
            setFilteredUsers(data.users);
            return;
        }

        // 3. Filter the original dataset (courses)
        const results = data.users.filter(course => {
            // Check if the query is found in the title, instructor, or category
            return (
                user.name.toLowerCase().includes(normalizedQuery) ||
                user.email.toLowerCase().includes(normalizedQuery)
                // course.category.toLowerCase().includes(normalizedQuery)
                // console.log(course)
            );
        });

        // 4. Update the display list with the new results
        setFilteredUsers(results);
    };

    const handleClear = () => {
        setSearchTerm('');
        setFilteredUsers(data.users)
    }
    // Update the total course count whenever new data is fetched
    useEffect(() => {
        if (data && data.userCount !== undefined) {
            setUserCount(data.userCount);
            setFilteredUsers(data.users);
        }
    }, [data]);

    // --- Handlers for URL Manipulation (Sorting and Per Page) ---

    // Function to handle changes to the number of items per page
    const handlePerPageChange = (newPerPage) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('perPage', newPerPage);
        params.set('page', 1);
        router.push(`${pathname}?${params.toString()}`);
    };
    const handleDelete = async (courseId) => {
        if (!window.confirm('Are you sure you want to delete this course?')) {
            return;
        }

        try {
            setIsDeleting(true);

            const result = await deleteCourse(courseId);

            if (result.success) {
                // Manually trigger a refetch
                await refetch();
                toast.success('Course deleted successfully!');
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.message || 'Failed to delete course');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleSortClick = (field) => {
        const params = new URLSearchParams(searchParams.toString());

        let newSortOrder = 'asc';
        let newSortField = field;

        if (sortField === field) {
            // If clicking the current sorted field, cycle the order
            if (sortOrder === 'asc') {
                newSortOrder = 'desc';
            } else if (sortOrder === 'desc') {
                // If currently descending, reset the sort (default state)
                newSortField = null;
                newSortOrder = 'default';
            } else { // Current is 'default'
                newSortOrder = 'asc';
            }
        }

        // Update URL parameters
        if (newSortField) {
            params.set('sortField', newSortField);
        } else {
            params.delete('sortField');
        }

        if (newSortOrder !== 'default') {
            params.set('sortOrder', newSortOrder);
        } else {
            params.delete('sortOrder');
        }

        // Reset to page 1 when sorting changes
        params.set('page', 1);

        router.push(`${pathname}?${params.toString()}`);
    };

    // Function to create pagination Link URLs
    const createPageUrl = (page) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page);
        return `${pathname}?${params.toString()}`;
    };

    // --- Loading and Error States ---
    if (isLoading) return <Loading />;
    if (isError) return <p className="text-center text-red-500 mt-10">Failed to load courses. (Mock Error)</p>;

    // --- Render Logic ---

    // Helper to get the correct sort icon
    const getSortIcon = (field) => {
        if (sortField !== field || sortOrder === 'default') {
            return <ArrowUpDown size={18} className="w-4 h-4 text-gray-400 group-hover:text-gray-700" />;
        }
        if (sortOrder === 'asc') {
            return <ArrowUp size={18} className="w-4 h-4 text-gray-700" />;
        }
        if (sortOrder === 'desc') {
            return <ArrowDown size={18} className="w-4 h-4 text-gray-700" />;
        }
        return <ArrowUpDown size={18} className="w-4 h-4 text-gray-400" />;
    };

    return (
        <div className='w-full'>

            <h1 className="text-3xl font-bold text-center text-gray-800">
                Total Users ({userCount})
            </h1>

            <div className="overflow-x-auto mx-10">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    gutter={8}
                    containerClassName=""
                    containerStyle={{}}
                    toastOptions={{
                        // Define default options
                        className: 'text-sm',
                        duration: 4000,
                        style: {
                            background: '#fff',
                            color: '#363636',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        },
                        success: {
                            iconTheme: {
                                primary: '#10B981',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#EF4444',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
                {/* Controls: Add Course and Per Page Buttons */}
                <div className='flex flex-wrap justify-between items-center my-4 '>
                    <div className='flex gap-5'>

                        <Link
                            href={`/admin_dashboard/courses/add`}
                            className='bg-primary-200 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-md hover:bg-primary-500 transition'
                        >
                            Add Course
                        </Link>
                        <div className="relative">
                            <div className="flex justify-center group   items-center border-2 focus:outline-1 bg-gray-100 gap-2 rounded-lg px-3 py-2">
                                <SearchIcon fontSize="small" className="text-gray-500 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search by title,instructor or tags"
                                    // 2. Bind value and change handler
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="bg-transparent border-none outline-none w-52 text-sm placeholder:text-sm placeholder:text-gray-500 transition-all duration-300 ease-in-out"
                                />
                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={handleClear}
                                        className="text-gray-500 hover:text-gray-800 p-0.5 rounded-full transition-colors ml-1 focus:outline-none"
                                    >
                                        <DeleteIcon className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end items-center gap-2 text-sm">
                        <span className='text-gray-600 mr-1'>Items per page:</span>
                        {[10, 25, 50, 100].map((num) => (
                            <button
                                key={num}
                                className={`p-2 rounded-lg font-medium transition ${currentPerPage === num ? 'bg-primary-300 text-white shadow-inner' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                onClick={() => handlePerPageChange(num)}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Course Table */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 capitalize bg-gray-50 border-b">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-semibold">No</th>
                                <th scope="col" className="px-6 py-3 font-semibold">
                                    {/* Sortable Header Button */}
                                    <button
                                        onClick={() => handleSortClick('title')}
                                        className="flex items-center gap-1 group focus:outline-none"
                                    >
                                        Username
                                        {getSortIcon('title')}
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3 font-semibold">
                                    <button
                                        onClick={() => handleSortClick('title')}
                                        className="flex items-center gap-1 group focus:outline-none"
                                    >
                                        Email
                                        {getSortIcon('instructor')}
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3 font-semibold">
                                    <button
                                        onClick={() => handleSortClick('title')}
                                        className="flex items-center gap-1 group focus:outline-none"
                                    >
                                        Gender
                                        {getSortIcon('instructor')}
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3 font-semibold">
                                    Created At
                                </th>
                                <th scope="col" className="px-6 py-3 font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Check if data.courses is available and render rows */}
                            {filteredUsers.map((user, index) => (

                                <tr key={user._id} className='bg-white border-b hover:bg-gray-50' >
                                    <td className="px-6 py-4">
                                        {(pageNumber - 1) * currentPerPage + index + 1}
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {user.name}
                                    </th>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.gender}</td>
                                    <td className="px-6 py-4">
                                        {/* Use actual course date and format it */}
                                        {
                                            user.createdAt ?
                                                new Date(user.createdAt).toLocaleTimeString("en-US", {
                                                    hour: "numeric",
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric"
                                                })
                                                : 'NA'
                                        }
                                    </td>
                                    <td className='px-6 py-4 flex space-x-2'>
                                        <Link
                                            href={`/admin_dashboard/users/edit/id=${user._id}`}
                                            className="p-2 text-primary-200 rounded-lg hover:bg-indigo-50 transition"
                                            title="Edit Course"
                                        >
                                            <Pencil size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="p-2 text-red-600 rounded-lg hover:bg-red-50 transition"
                                            title="Delete Course"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>

                                </tr>
                            ))}
                            {/* Display message if no courses are found */}
                            {!filteredUsers && data.users.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-8 text-gray-500">
                                        No courses found for this platform or filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-end mr-10 mt-6">
                <div className="flex items-center space-x-2 p-4">
                    {/* Previous Page Link */}
                    {pageNumber === 1 ? (
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 cursor-not-allowed border border-gray-200">
                            &lt;
                        </span>
                    ) : (
                        <Link href={createPageUrl(prevPage)} className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 transition border border-gray-200">
                            &lt;
                        </Link>
                    )}

                    {/* Page Number Links */}
                    {pageNumbers.map((pageNum) => (
                        <Link
                            key={pageNum}
                            href={createPageUrl(pageNum)}
                            className={`flex h-10 w-10 items-center justify-center rounded-lg font-medium transition 
                                ${pageNum === pageNumber ? 'bg-primary-200 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200 border border-gray-200'}`}
                        >
                            {pageNum}
                        </Link>
                    ))}

                    {/* Next Page Link */}
                    {pageNumber >= totalPages ? (
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 cursor-not-allowed border border-gray-200">
                            &gt;
                        </span>
                    ) : (
                        <Link href={createPageUrl(nextPage)} className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 transition border border-gray-200">
                            &gt;
                        </Link>
                    )}
                </div>
            </div>
        </div >
    );
};

export default page;