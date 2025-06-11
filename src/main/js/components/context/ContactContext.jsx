import React, { createContext, useState, useContext } from 'react';

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
    // const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);

    // const addContact = (contact) => {
    //     setContacts([...contacts, contact]);
    // };

    // const removeContact = (contactId) => {
    //     setContacts(contacts.filter(contact => contact.id !== contactId));
    // };

    // const selectContact = (contact) => {
    //     setSelectedContact(contact);
    // };

    return (
        // <ContactContext.Provider value={{ contacts, addContact, removeContact, selectedContact, selectContact }}>
        <ContactContext.Provider value={{ selectedContact, setSelectedContact }}>
            {children}
        </ContactContext.Provider>
    );
};

export const useContact = () => useContext(ContactContext);
