import Wrapper from '../../wrapper/Index.jsx';
import Message from './Message.jsx';
import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from 'react-router';
import { useNavigate } from 'react-router';
// import { useAuth } from '../../AuthContext';

import './messages.css';
import './../../components/global.css'
import Contact from './Contact.jsx';



const MessagesContacts = () => {
    return (
        <Wrapper>
            <section className='container-messages'>
                <div className='contacts-mobile'>
                    <div className='titre-messages'>Contacts</div>
                    <Contact prenom='Laurent' nom='DUPONT' />
                    <Contact prenom='Sophie' nom='LEGRAND' />
                    <Contact prenom='Jean' nom='MARTIN' />
                    <Contact prenom='Laurent' nom='DURAND' />
                    <Contact prenom='Paul' nom='LEROY' />
                    <Contact prenom='Paul' nom='LEROY' />
                    <Contact prenom='Paul' nom='LEROY' />
                    <Contact prenom='Paul' nom='LEROY' />
                    <Contact prenom='Paul' nom='LEROY' />
                </div>
            </section>
        </Wrapper>

    )
}

export default MessagesContacts;