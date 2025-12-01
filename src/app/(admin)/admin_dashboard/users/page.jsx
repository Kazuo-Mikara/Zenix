'use client'

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import getUsers from '@/helpers/(admin)/users/getAllUsers';
import deleteUser from '@/helpers/(admin)/users/deleteUser';
import Loading from '../../components/loading';
import { useRouter, } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast'
import { Trash2, Pencil, ArrowUp, ArrowDown, ArrowUpDown, SearchIcon, DeleteIcon } from 'lucide-react';
import CancelModalComponent from '../../components/CancelModalComponent';

// Your existing mock components and functions...
const useSearchParams = () => {
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    return params;
};
const usePathname = () => (typeof window !== 'undefined' ? window.location.pathname : '/admin_dashboard/users');

const Link = ({ href, children, ...props }) => (
    <a href={href} {...props}>{children}</a>
);

const page = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // State for filtering
    const [coursePlatform] = useState('Total');
    const [userCount, setUserCount] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null); // **Track selected user ID**
    const [selectedUserName, setSelectedUserName] = useState(''); // **Track user name for display**

    // Read URL parameters
    const pageNumber = parseInt(searchParams.get('page')) || 1;
    const sortField = searchParams.get('sortField');
    const sortOrder = searchParams.get('sortOrder') || 'default';
    const currentPerPage = parseInt(searchParams.get('perPage')) || 25;

    // Pagination calculation
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

    // React Query Fetching
    const { data: data = { users: [], userCount: 0 }, isLoading, isError, refetch } = useQuery({
        queryKey: ['users', currentPerPage, pageNumber, sortField, sortOrder],
        queryFn: () => getUsers({
            page: pageNumber,
            perPage: currentPerPage,
            coursePlatform: coursePlatform,
            sortField: sortField,
            sortOrder: sortOrder === 'default' ? null : sortOrder,
        }),
    });

    // Search states
    const [filteredUsers, setFilteredUsers] = useState(data.users);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (query) => {
        setSearchTerm(query);
        const normalizedQuery = query.toLowerCase().trim();

        if (normalizedQuery === '') {
            setFilteredUsers(data.users);
            return;
        }

        const results = data.users.filter(user => {
            return (
                user.firstName?.toLowerCase().includes(normalizedQuery) ||
                user.lastName?.toLowerCase().includes(normalizedQuery) ||
                user.email.toLowerCase().includes(normalizedQuery)
            );
        });

        setFilteredUsers(results);
    };

    const handleClear = () => {
        setSearchTerm('');
        setFilteredUsers(data.users)
    }

    // Update data when fetched
    useEffect(() => {
        if (data && data.userCount !== undefined) {
            setUserCount(prevCount =>
                prevCount !== data.userCount ? data.userCount : prevCount
            );
            setFilteredUsers(prevUsers =>
                JSON.stringify(prevUsers) !== JSON.stringify(data.users)
                    ? data.users : prevUsers
            );
        }
    }, [data]);

    const handlePerPageChange = (newPerPage) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('perPage', newPerPage);
        params.set('page', 1);
        router.push(`${pathname}?${params.toString()}`);
    };


    const handleOpenModal = (userId, userName) => {
        setSelectedUserId(userId);
        setSelectedUserName(userName);
        setOpenDeleteModal(true);
    };

    const handleCloseModal = () => {
        setOpenDeleteModal(false);
        setSelectedUserId(null);
        setSelectedUserName('');
    };
    // console.log(selectedUserId)
    const handleDelete = async () => {
        if (!selectedUserId) {
            toast.error('No user selected for deletion');
            return;
        }

        try {
            setIsDeleting(true);
            const result = await deleteUser(selectedUserId);
            if (result.success) {
                await refetch();
                toast.success('User deleted successfully!');
                handleCloseModal();
            } else {
                toast.error(result.message || 'Failed to delete user');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to delete user');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleSortClick = (field) => {
        const params = new URLSearchParams(searchParams.toString());

        let newSortOrder = 'asc';
        let newSortField = field;

        if (sortField === field) {
            if (sortOrder === 'asc') {
                newSortOrder = 'desc';
            } else if (sortOrder === 'desc') {
                newSortField = null;
                newSortOrder = 'default';
            } else {
                newSortOrder = 'asc';
            }
        }

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

        params.set('page', 1);
        router.push(`${pathname}?${params.toString()}`);
    };

    const createPageUrl = (page) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page);
        return `${pathname}?${params.toString()}`;
    };

    if (isLoading) return <Loading />;
    if (isError) return <p className="text-center text-red-500 mt-10">Failed to load users.</p>;

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
                    toastOptions={{
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

                <CancelModalComponent
                    open={openDeleteModal}
                    setOpen={handleCloseModal}
                    handleCancel={handleDelete}
                    isLoading={isDeleting}
                    message={`Are you sure you want to delete ${selectedUserName}?`}
                    sub_message="This action cannot be undone."
                />

                {/* Controls */}
                <div className='flex flex-wrap justify-between items-center my-4'>
                    <div className='flex gap-5'>
                        <Link
                            href={`/admin_dashboard/users/add`}
                            className='bg-primary-200 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-md hover:bg-primary-500 transition'
                        >
                            Add User
                        </Link>
                        <div className="relative">
                            <div className="flex justify-center group items-center border-2 focus:outline-1 bg-gray-100 gap-2 rounded-lg px-3 py-2">
                                <SearchIcon fontSize="small" className="text-gray-500 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search by name or email"
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

                {/* Users Table */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 capitalize bg-gray-50 border-b">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-semibold">No</th>
                                <th scope="col" className="px-6 py-3 font-semibold">
                                    <button
                                        onClick={() => handleSortClick('firstName')}
                                        className="flex items-center gap-1 group focus:outline-none"
                                    >
                                        First Name
                                        {getSortIcon('firstName')}
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3 font-semibold">
                                    <button
                                        onClick={() => handleSortClick('lastName')}
                                        className="flex items-center gap-1 group focus:outline-none"
                                    >
                                        Last Name
                                        {getSortIcon('lastName')}
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3 font-semibold">
                                    <button
                                        onClick={() => handleSortClick('email')}
                                        className="flex items-center gap-1 group focus:outline-none"
                                    >
                                        Email
                                        {getSortIcon('email')}
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3 font-semibold">Role</th>
                                <th scope="col" className="px-6 py-3 font-semibold">Status</th>
                                <th scope="col" className="px-6 py-3 font-semibold">Created At</th>
                                <th scope="col" className="px-6 py-3 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={user._id} className='bg-white border-b hover:bg-gray-50'>
                                    <td className="px-6 py-4">
                                        {(pageNumber - 1) * currentPerPage + index + 1}
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {user.firstName}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {user.lastName}
                                    </th>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className='px-2 py-1 rounded-full text-xs font-medium' >
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-100 text-green-800 border border-green-200' :
                                            user.status === 'inactive' ? 'bg-red-100 text-red-800 border border-red-200' :
                                                'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                            }`}>
                                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.createdAt ?
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
                                            title="Edit User"
                                        >
                                            <Pencil size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleOpenModal(user._id, `${user.firstName} ${user.lastName}`)}
                                            className="p-2 text-red-600 rounded-lg hover:bg-red-50 transition"
                                            title="Delete User"
                                            disabled={isDeleting}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="text-center py-8 text-gray-500">
                                        No users found.
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
                    {pageNumber === 1 ? (
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 cursor-not-allowed border border-gray-200">
                            &lt;
                        </span>
                    ) : (
                        <Link href={createPageUrl(prevPage)} className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 transition border border-gray-200">
                            &lt;
                        </Link>
                    )}

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