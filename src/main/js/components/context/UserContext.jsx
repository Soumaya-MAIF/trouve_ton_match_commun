import React, { createContext, useState, useContext } from 'react';

// Créer le contexte pour gérer l'utilisateur sélectionné

// Créer le contexte
const UserContext = createContext();

// Fournisseur du contexte
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // État pour l'utilisateur sélectionné

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useUser = () => useContext(UserContext);