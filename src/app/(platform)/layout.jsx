"use client"
import React from 'react'

import NavBar from './home/components/NavBar'

export default function PlatformLayout({ children }) {

    return (
        <div className="min-h-screen bg-gray-50">

            <NavBar />
            <main className="w-full mx-auto p-4 z-0">
                {children}
            </main>
        </div>
    )
}
