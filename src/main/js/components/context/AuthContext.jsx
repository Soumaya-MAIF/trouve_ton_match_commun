import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 
// Créer le contexte
export const AuthContext = createContext();
 
// et l'état admin (isAdmin) pour les utilisateurs ayant des privilèges d'administration
// Gère les fonctions de connexion et de déconnexion
 
// Fournisseur du contexte
export const AuthProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false); // État admin ou non
    const [auth, setAuth] = useState(null);
    const navigate = useNavigate();
 
    // Charge l'utilisateur authentifié au démarrage
    // useEffect(() => {
    //     const fetchAuthenticatedUser = async () => {
    //         try {
    //             const authenticatedUser = await userService.getAuthenticateUser();
    //             setAuth(authenticatedUser); // Met l'utilisateur dans le state
    //             console.log("Utilisateur authentifié :", authenticatedUser);
    //         } catch (error) {
    //             console.error("Échec de récupération de l'utilisateur :", error);
    //             setAuth(null); // Aucun utilisateur authentifié
    //         }
    //     };
 
    //     fetchAuthenticatedUser();
    // }, []);
 
    // Fonction pour gérer la déconnexion
    // const logout = async () => {
    //     try {
    //         await fetch("/logout", { method: "POST", credentials: "include" }); // Déconnexion serveur
    //         setAuth(null); // Réinitialise le state local
    //     } catch (error) {
    //         console.error("Erreur lors de la déconnexion :", error);
    //     }
    // };
 
    // fonction de connexion
    const login = (isAdminUser = false) => {
        setIsAdmin(isAdminUser);
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