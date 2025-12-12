import axios from "axios";

const getCourses = async ({ page, perPage, sortField, sortOrder }) => {
    try {
        const response = await axios.post('/api/users', {
            page: page,
            perPage: perPage,
            sortField: sortField,
            sortOrder: sortOrder === 'default' ? null : sortOrder
        });
        const data = response.data; // Now it's defined
        console.log(data); // Optional: log the actual data
        return data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
};

export default getCourses;
