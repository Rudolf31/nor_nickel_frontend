"use client";
import { useAuthStore } from '../../stores/auntificationStore';
import { useRouter } from 'next/navigation'; // Import useRouter
import apiConfig from '@/assets/apiConfig';

const Authentication: React.FC = () => {
    const { username, password, setCredentials, login } = useAuthStore();
    const router = useRouter(); // Initialize useRouter

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // Prepare the login data
        const loginData = {
            username, // Assuming you have a username state variable
            password, // Assuming you have a password state variable
        };

        console.log(loginData);
    
        try {
            // Send a POST request to the login endpoint
            const response = await fetch( apiConfig.postLogin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
        
            
    
            // Check if the response is ok (status in the range 200-299)
            if (response.ok) {
                const data = await response.json();
                // Assuming the token is returned in the response
                localStorage.setItem('token', data.token); // Store the token in localStorage
    
                console.log('Logged in with:', username, password);
                router.push('/'); // Redirect to the main page
            } else {
                console.error('Login failed');
                // Optionally, handle login failure (e.g., show an error message)
                const errorData = await response.json();
                console.error('Error message:', errorData.message);
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
        }
    };
    

    return (
        <div className="p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-4xl text-center text-primary mb-4">Вход в аккаунт</h2>
            <form onSubmit={handleSubmit} className="text-xl w-96 mx-auto bg-third p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block  text-fourth">Логин:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setCredentials(e.target.value, password)} 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-fourth">Пароль:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setCredentials(username, e.target.value)} 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary"
                >
                    Войти
                </button>
            </form>
        </div>
    );
};

export default Authentication;
