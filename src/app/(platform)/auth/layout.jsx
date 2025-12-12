import Footer from '@/components/Footer'
import React from 'react'
import { AuthProvider } from "@/utils/(user)/UserAuthContext";
const AuthLayout = ({ children }) => {
    return (
        <AuthProvider>
            <div>
                {children}
            </div>
        </AuthProvider>
    )
}

export default AuthLayout