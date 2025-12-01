
import axios from 'axios';

const createCourse = async (dataToSubmit) => {
    try {
        const response = await axios.post('/api/admin/courses/add', dataToSubmit, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {

        if (error.response) {
            const errorData = error.response.data;
            const customError = new Error(errorData.message || 'API call failed');
            customError.errors = errorData.errors || {};
            customError.status = error.response.status;
            throw customError;
        } else if (error.request) {
            // Request was made but no response received
            throw new Error('Network error - no response received');
        } else {
            // Something else happened
            throw new Error(error.message);
        }
    }
};

export default createCourse;