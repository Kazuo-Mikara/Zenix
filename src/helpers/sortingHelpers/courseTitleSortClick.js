const courseTitleSortClick = ({ sortOrder, courses }) => {
    const nextOrder = sortOrder === 'default' ? 'asc' : sortOrder === 'asc' ? 'desc' : 'default';

    if (nextOrder === 'default') {
        return { nextOrder, sortedCourses: courses };
    }

    const sortedCourses = [...courses].sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return nextOrder === 'asc'
            ? titleA.localeCompare(titleB)
            : titleB.localeCompare(titleA);
    });

    return { nextOrder, sortedCourses };
};

export default courseTitleSortClick;
