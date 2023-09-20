import fetch from 'node-fetch';

// Define a type for the expected response structure
type LoginResponse = {
    token: string;
    // Add other fields if present in the JSON response
    // Example: username: string;
};

export const getLoginToken = async (username, password): Promise<string> => {
    try {
        const response = await fetch('http://localhost:2221/api/login', {
            method: 'POST',
            body: JSON.stringify({ username: username, password: password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
            const body: LoginResponse = await response.json() as LoginResponse;
            return body.token;
        } else {
            throw new Error('Error: Invalid response status code');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to get token');
    }
};
