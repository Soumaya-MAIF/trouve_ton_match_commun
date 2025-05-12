import React, { createContext, useState, useContext } from 'react';

// Créer le contexte
const AuthContext = createContext();

// Fournisseur du contexte
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // État de connexion
    const [isAdmin, setIsAdmin] = useState(false); // État admin

    const login = (isAdminUser = false) => {
        console.log('Login appelé avec isAdmin:', isAdminUser); // Log pour vérifier l'appel
        setIsAuthenticated(true);
        setIsAdmin(isAdminUser);
        console.log('isAuthenticated:', true, 'isAdmin:', isAdminUser); // Log pour vérifier les états
    };

    const logout = () => {
        console.log('Logout appelé'); // Log pour vérifier l'appel
        setIsAuthenticated(false);
        setIsAdmin(false);
        localStorage.removeItem('id'); // Supprimer l'ID utilisateur du localStorage
        console.log('isAuthenticated:', false, 'isAdmin:', false); // Log pour vérifier les états
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);