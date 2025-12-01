import axios from "axios";

const getCourseById = async ({ courseId }) => {
    try {
        const response = await axios.post(`/api/admin/courses/edit`, {
            courseId: courseId,
        });
        const data = response.data; // Now it's defined
        console.log(data); // Optional: log the actual data
        return data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
};

export default getCourseById;
