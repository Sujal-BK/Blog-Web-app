import { createContext, useContext, useState } from "react";
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [role, setRole] = useState(localStorage.getItem('role'))

    const storeTokenInLS = (serverToken, role) => {
        const cleanRole = role?.trim().toLowerCase();
        setToken(serverToken);
        setRole(cleanRole);
        localStorage.setItem('token', serverToken);
        localStorage.setItem('role', cleanRole);
    };
    
    let isLoggedIn = !!token;
    let isAdmin = role?.trim().toLowerCase() === 'admin';


    const Logout = () => {
        setToken("")
        setRole("")

        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    return (
        <AuthContext.Provider value={{ storeTokenInLS, Logout, isLoggedIn, isAdmin }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}