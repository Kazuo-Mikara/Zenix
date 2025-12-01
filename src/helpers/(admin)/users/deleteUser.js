import axios from "axios"

const deleteUser = async (userId) => {
    console.log(userId);
    try {
        const response = await fetch(`/api/admin/users/delete?id=${userId}`, {
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

export default deleteUser