import { cookies } from "next/headers"

export const validateUserSession = async () => {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')
    if (!authToken) {
        return {
            success: false,
            message: "No auth token found"
        }
    }
    else if (authToken) {
        return {
            success: true,
            message: "Auth token found"
        }
    }
}