// helpers/(admin)/users/updateUser.js
import axios from "axios";

const updateUser = async (formData) => {
    try {
        // Send userId in URL, not body
        const response = await axios.put(`/api/admin/users/edit/`, formData);
        return response.data;
    } catch (error) {
        console.error('Update user error:', error);

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

export default updateUser;