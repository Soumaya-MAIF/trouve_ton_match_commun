import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 
// Créer le contexte
export const AuthContext = createContext();
 
// et l'état admin (isAdmin) pour les utilisateurs ayant des privilèges d'administration
// Gère les fonctions de connexion et de déconnexion
 
// Fournisseur du contexte
export const AuthProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(null); // État admin ou non
    const [auth, setAuth] = useState(null);
    const navigate = useNavigate();
 
    // fonction de connexion
    const login = (isAdminUser, token) => {
        setIsAdmin(isAdminUser);
        setAuth(token);
    };
    
 
    // fonction de déconnexion
    const logout = () => {
    
    setIsAdmin(false);

    // Supprimer le cookie "token"
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    setAuth(null);

    // Rediriger vers la page de connexion
     navigate('/connexion'); 

    };
 
    return (
        <AuthContext.Provider value={{ isAdmin, auth, setAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
 
// Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);