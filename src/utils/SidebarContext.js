import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const SidebarContext = createContext();

// Create the provider component
export const SidebarProvider = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Toggle sidebar state
    const toggleSidebar = () => {
        setIsCollapsed(prev => !prev);
    };

    return (
        <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};