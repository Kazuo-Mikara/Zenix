"use client"
import React from 'react'
import { SidebarProvider } from '../utils/SidebarContext'

export default function SidebarPlatformClient({ children }) {
    return (
        <SidebarProvider>
            {children}
        </SidebarProvider>
    )
}
