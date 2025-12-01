import axios from "axios";

const updateCourse = async (courseData) => {
    try {
        const response = await axios.put('/api/admin/courses/edit', courseData);
        return response.data;
    } catch (error) {
        console.error('Error updating course:', error);
        // Throw the error so the component can handle it (e.g., show validation errors)
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error('An unexpected error occurred');
    }
};

export default updateCourse;
