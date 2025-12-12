import axios from "axios";

const checkUserEnrollments = async (userId) => {
    try {
        const response = await axios.get(`/api/users/${userId}/enrollments`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user enrollments:', error);
        throw error;
    }
};


export const getUserEnrollments = async (userId) => {
    try {
        const response = await axios.get(`/api/users/${userId}/enrollments`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user enrollments:', error);
        throw error;
    }
};
export default checkUserEnrollments;