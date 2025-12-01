// hooks/useUserStats.js
'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

const INITIAL_USER_STATS = {
    total: 0,
    male: 0,
    female: 0
};

export const useUserStats = () => {
    const [userCount, setUserCount] = useState(INITIAL_USER_STATS);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.get('/api/getUserCount');
            const result = response.data;
            const { femaleUsers, maleUsers } = result;

            setUserCount({
                female: femaleUsers,
                male: maleUsers,
                total: femaleUsers + maleUsers
            });
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

    return { userCount, isLoading, error, refetch: fetchData };
};