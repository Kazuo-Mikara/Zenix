import axios from "axios"

const deleteCourse = async (courseId) => {
    try {
        const response = await fetch(`/api/admin/courses/delete?id=${courseId}`, {
            method: 'DELETE',
        });
        const data = response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete course');
        }

        return data;
    } catch (error) {
        console.error('Network error:', error);
    }

}

export default deleteCourse