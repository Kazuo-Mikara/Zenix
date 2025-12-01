import axios from "axios";

const getDashboardInfo = async () => {
    try {

        // const response = await axios.get('/api/getUserCount')
        const response = await axios.get('/api/admin/dashboard')
        const data = response.data
        return data;
    }
    catch (error) {
        return error
    }
}

export default getDashboardInfo