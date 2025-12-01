// hooks/useUserStats.js
'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';


export const useUserTimeline = () => {
    const [userTimeline, setUserTimeline] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(userTimeline)
    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.get('/api/getUserTimeline');
            const data = response.data.userTimeline;
            setUserTimeline(data);
            console.log(data)
        } catch (err) {
            console.error('Error fetching user data:', err);
            setError('Failed to load user analytics');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { userTimeline, isLoading, error, refetch: fetchData };
};