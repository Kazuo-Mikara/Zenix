import axios from "axios";

const createUser = async (formData) => {
    try {
        const response = await axios.post("/api/admin/users/add", formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Create user error:', error);

        if (error.response) {
            const errorData = error.response.data;
            const customError = new Error(errorData.message || 'API call failed');
            customError.errors = errorData.errors || {};
            customError.status = error.response.status;
            customError.success = false;
            throw customError;
        } else if (error.request) {
            throw new Error('Network error - no response received');
        } else {
            throw new Error(error.message);
        }
    }
};

export default createUser;