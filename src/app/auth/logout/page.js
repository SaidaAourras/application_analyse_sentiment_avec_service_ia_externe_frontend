
import React from 'react';

// Fonction de déconnexion
export function handleLogout() {
    localStorage.removeItem('my_token');
    window.location.href = '/auth/login';
}

export default function LogoutButton() {
    return (
        <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-200 ease-in-out shadow-md hover:shadow-lg"
        >
            Logout
        </button>
    );
}