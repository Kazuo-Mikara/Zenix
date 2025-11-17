import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
// Mock Next.js imports for runnable single-file context
const Link = ({ href, children, className }) => <a href={href} className={className}>{children}</a>;
const Home = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);
const Loader2 = () => null; // Not used but kept for consistency
/**
 * Helper function to format path segments (e.g., 'admin_dashboard' -> 'Admin Dashboard')
 * @param {string} segment - The raw path segment.
 * @returns {string} The display-friendly label.
 */
const formatSegment = (segment) => {
    // Replace hyphens/underscores with spaces and capitalize each word
    const formatted = segment
        .replace(/[-_]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Simple custom overrides for common slugs
    if (formatted === 'Admin Dashboard') return 'Dashboard';
    if (formatted === 'Add') return 'Add New';

    return formatted;
};

const SeparatorIcon = () => (
    <svg
        className="w-3.5 h-3.5 rtl:rotate-180 text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
    >
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m9 5 7 7-7 7"
        />
    </svg>
);


const BreadCrumbsNavigation = () => {

    const pathname = usePathname();
    const breadcrumbs = useMemo(() => {
        const segments = pathname.split('/').filter(s => s);
        let cumulativePath = '';

        return segments.map((segment, index) => {
            cumulativePath += '/' + segment;

            return {
                href: cumulativePath,
                label: formatSegment(segment),
                isCurrent: index === segments.length - 1,
            };
        });
    }, [pathname]);

    // Determine the main page title (last breadcrumb's label)
    const pageTitle = breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].label : 'Home';
    const homeSegment = {
        href: '/admin_dashboard',
        label: 'Dashboard',
        isCurrent: breadcrumbs.length === 0,
    };

    // Combine Home segment with dynamic path segments
    const allSegments = [homeSegment, ...breadcrumbs];

    return (
        <div className="p-4 sm:p-6  rounded-xl  font-inter">
            <nav className="flex flex-col" aria-label="Breadcrumb">

                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    {allSegments.map((item, index) => {
                        // Skip the root admin_dashboard segment if it's the first in the path
                        // This prevents duplicating the "Home" link.
                        if (item.label === 'Dashboard' && index === 0 && breadcrumbs.length > 0) return null;

                        const isFirstLink = index === 1;
                        const isCurrent = item.isCurrent;

                        const linkClasses = isCurrent
                            ? "inline-flex items-center text-lg font-medium text-gray-900"
                            : "inline-flex items-center text-lg font-medium text-gray-700 hover:text-primary-700 transition";

                        return (
                            <React.Fragment key={item.href}>
                                {index > 0 && (
                                    <li aria-hidden="true">
                                        <div className="flex items-center space-x-1.5">
                                            {
                                                !isFirstLink && (

                                                    <SeparatorIcon />
                                                )
                                            }
                                        </div>
                                    </li>
                                )}

                                <li className={`${index > 0 ? 'ml-1.5' : ''}`} aria-current={isCurrent ? 'page' : undefined}>
                                    {isCurrent ? (
                                        <span className={linkClasses}>
                                            {isFirstLink && <Home size={18} className='mr-2' />}
                                            {item.label}
                                        </span>
                                    ) : (
                                        <Link href={item.href} className={linkClasses}>
                                            {isFirstLink && <Home size={18} className='mr-2' />}
                                            {item.label}
                                        </Link>
                                    )}
                                </li>
                            </React.Fragment>
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
}
export default BreadCrumbsNavigation