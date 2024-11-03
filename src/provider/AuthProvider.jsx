import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(true);
    const navigate = useNavigate();


    //check token on initial load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser(true);
            console.log('Token found in context: ',token);
            console.log("user state ", user);
        } else {
            setUser(false);
        }
    }, [user]);

    const login = (token, email) => {
        if (!email || !token) {
            console.error("Invalid login data: missing token or email");
            return;
        }
        
        // Set token and email in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userEmail', email);
        setUser(true);
    
        // Add a short delay before navigating
        setTimeout(() => {
            navigate('/');
        }, 100); // Adjust delay as necessary (e.g., 100ms)
    };
    
    

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail')
        setUser(false);
        navigate('/login');
    }

    const handleAuthError = (error) => {
        if (error.response && error.response.status === 498) {
            logout();  // Invalid token, clear it and redirect to login
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, handleAuthError }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);