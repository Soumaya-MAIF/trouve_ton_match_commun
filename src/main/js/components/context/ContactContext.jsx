import React, { createContext, useState, useContext } from 'react';

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
    const [selectedContact, setSelectedContact] = useState(null);
    
    return (
        <ContactContext.Provider value={{ selectedContact, setSelectedContact }}>
            {children}
        </ContactContext.Provider>
    );
};

export const useContact = () => useContext(ContactContext);
