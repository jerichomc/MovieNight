const API_BASE_URL = 'http://localhost:5000';

export async function checkApiHealth() {
    const response = await fetch(`${API_BASE_URL}/api/health`);

    if(!response.ok){
        throw new Error('Failed to connect to backend');
    }

    return response.json();
}