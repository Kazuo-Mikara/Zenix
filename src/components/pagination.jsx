import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

function Pagination({ postsPerPage, totalPosts, paginate, currentPage = 1 }) {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const [activePage, setActivePage] = useState(currentPage);
    const [maxVisiblePages, setMaxVisiblePages] = useState();
    const handlePageClick = (number) => {
        if (number < 1 || number > totalPages) return;
        setActivePage(number);
        paginate(number);
    }


    const getPageNumbers = () => {
        // Total pages to show when totalPages is large (e.g., [1] ... [20] [21] [22] ... [100])
        // Used for the "fixed" large window if you still want it
        // const maxPagesToShow = 20; 
        // The number of visible buttons (e.g., 1, 2, 3, 4, 5, or 1, ..., 20, 21, 22, ..., 100)
        // const maxVisiblePages = 20; 



        let pagesToShow = [];

        // Always show first page
        pagesToShow.push(1);

        // 1. DETERMINE THE WINDOW START AND END

        // Center the visible window around the active page, but keep it within bounds (2 to totalPages - 1)
        let halfWindow = Math.floor((maxVisiblePages - 3) / 2); // e.g., for 5 visible buttons: (5-3)/2 = 1. Window is [active-1, active, active+1]

        let startPage = Math.max(2, activePage - halfWindow);
        let endPage = Math.min(totalPages - 1, activePage + halfWindow);

        // Adjust window to stick to the edges when near page 1 or totalPages
        if (activePage <= halfWindow + 2) {
            // If activePage is near the start, extend the end of the window
            endPage = maxVisiblePages - 1;
            startPage = 2; // Ensure we start at 2
        } else if (activePage > totalPages - (halfWindow + 2)) {
            // If activePage is near the end, pull the start of the window
            startPage = totalPages - (maxVisiblePages - 2);
            endPage = totalPages - 1; // Ensure we end at totalPages - 1
        }

        // 2. ADD ELLIPSIS AT START
        if (startPage > 2) {
            pagesToShow.push('...');
        }

        // 3. ADD MIDDLE PAGES
        for (let i = startPage; i <= endPage; i++) {
            // Only push pages that haven't been pushed (like page 1)
            if (i > 1 && i < totalPages) {
                pagesToShow.push(i);
            }
        }

        // 4. ADD ELLIPSIS AT END
        if (endPage < totalPages - 1) {
            pagesToShow.push('...');
        }

        // 5. Always show last page (unless total pages is 1, which is caught by the initial check)
        if (totalPages > 1) {
            // Check if the last page hasn't already been included in the range
            if (pagesToShow[pagesToShow.length - 1] !== totalPages) {
                pagesToShow.push(totalPages);
            }
        }

        return pagesToShow;
    };
    useEffect(() => {
        if (totalPages <= 30) {
            setMaxVisiblePages(10);

        }
        else if (totalPages >= 60) {
            setMaxVisiblePages(20);
        }
    }, [totalPages]);
    return (
        <div className="flex justify-center my-6 ">
            <nav className="flex flex-row rounded-md gap-2 shadow-sm " aria-label="Pagination">
                {/* Previous button */}
                <button
                    onClick={() => handlePageClick(activePage - 1)}
                    disabled={activePage === 1}
                    className={`relative inline-flex items-center px-2 py-2  rounded-2xl ${activePage === 1
                        ? ' bg-gray-100 text-gray-400 cursor-not-allowed'
                        : ' bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                >
                    <span className="sr-only">Previous</span>
                    <FaChevronLeft className="h-3 w-3" />
                </button>

                {/* Page numbers */}
                {getPageNumbers().map((number, index) => (
                    <button
                        key={index}
                        onClick={() => typeof number === 'number' ? handlePageClick(number) : null}
                        className={`relative inline-flex items-center px-3 py-2 rounded-2xl  ${number === activePage
                            ? 'z-10 bg-primary  text-white'
                            : number === '...'
                                ? ' bg-white text-gray-700'
                                : ' bg-white text-gray-700 hover:bg-primary hover:text-white'
                            }`}
                    >
                        {number}
                    </button>
                ))}

                {/* Next button */}
                <button
                    onClick={() => handlePageClick(activePage + 1)}
                    disabled={activePage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2   ${activePage === totalPages
                        ? ' bg-gray-100 text-gray-400 cursor-not-allowed'
                        : ' bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                >
                    <span className="sr-only">Next</span>
                    <FaChevronRight className="h-3 w-3" />
                </button>
            </nav>
        </div>
    )
}

export default Pagination