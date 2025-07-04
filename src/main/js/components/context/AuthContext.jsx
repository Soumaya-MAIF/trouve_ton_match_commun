import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "../../service/jwtDecode";

// Créer le contexte
export const AuthContext = createContext();

// et l'état admin (isAdmin) pour les utilisateurs ayant des privilèges d'administration
// Gère les fonctions de connexion et de déconnexion

// Fournisseur du contexte
export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null); // État admin ou non
  const [typeUtilisateur, setTypeUtilisateur] = useState(null);
  const [idUtilisateur, setIdUtilisateur] = useState();

  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token != null) {
      setAuth(token);

      const user = jwtDecode(token).payload["user"];
      setRole(user.role);
      setTypeUtilisateur(user.type);
      setIdUtilisateur(user.id);
    }
  }, [setAuth]);

  // fonction de connexion
  const login = (role, typeUtilisateur, token) => {
    setRole(role);
    setTypeUtilisateur(typeUtilisateur);
    setAuth(token);
  };

  // fonction de déconnexion
  const logout = () => {
    setRole(null);

    // Supprimer le cookie "token"
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    setAuth(null);

    // Rediriger vers la page de connexion
    navigate("/connexion");
  };

  return (
    <AuthContext.Provider value={{ role, auth, setAuth, login, logout, typeUtilisateur, idUtilisateur }}>{children}</AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);
