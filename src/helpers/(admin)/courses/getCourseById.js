import axios from "axios";

const getCourseById = async ({ courseId }) => {
    try {
        const response = await axios.post('/api/admin/courses/edit', {
            courseId: courseId,
        });
        const data = response.data;
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
};

export default getCourseById;
