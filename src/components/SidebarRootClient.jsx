"use client"
import React from 'react'
import { SidebarProvider } from '../utils/SidebarContext'

export default function SidebarRootClient({ children }) {
    return (
        <SidebarProvider>
            {children}
        </SidebarProvider>
    )
}
