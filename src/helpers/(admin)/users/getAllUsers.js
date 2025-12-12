import axios from "axios";

const getUsers = async ({ page, perPage, coursePlatform, sortField, sortOrder }) => {
    try {
        const response = await axios.post('/api/users', {
            page: page,
            perPage: perPage,
            coursePlatform: coursePlatform,
            sortField: sortField,
            sortOrder: sortOrder === 'default' ? null : sortOrder
        });
        const data = response.data; // Now it's defined
        return data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
};

export default getUsers;
