import Footer from '@/components/Footer'
import React from 'react'

const AuthLayout = ({ children }) => {
    return (
        <div>
            {children}
            <Footer />
        </div>
    )
}

export default AuthLayout