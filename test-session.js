const axios = require('axios');

async function testSession() {
    try {
        // First, login to get the cookie
        console.log('Testing login...');
        const loginResponse = await axios.post('http://localhost:3000/api/login', {
            email: 'testuser@example.com',
            password: 'password123'
        }, {
            withCredentials: true
        });

        console.log('Login response:', loginResponse.data);

        // Extract cookies from response
        const cookies = loginResponse.headers['set-cookie'];
        console.log('Cookies received:', cookies);

        // Now test session with the cookies
        console.log('\nTesting session...');
        const sessionResponse = await axios.get('http://localhost:3000/api/session', {
            headers: {
                'Cookie': cookies ? cookies.join('; ') : ''
            }
        });

        console.log('Session response:', sessionResponse.data);

    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
        }
    }
}

testSession();