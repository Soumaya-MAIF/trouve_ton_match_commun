import Wrapper from '../../wrapper/Index';
import { useEffect, useState, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../AuthContext';


import { ChampSaisie } from './../../components/champ-saisie/ChampSaisie.jsx';
import './messages.css';
import './../../components/global.css'

const Messages = ( ) => {
    return (
        <Wrapper>
            <section className='container-messages'>
                <div className='contacts'>
                    <div className='titre-messages'>Contacts</div>
                    <div className='nom-contact'>Laurent DUPONT</div>
                    <div className='nom-contact'>Sophie LEGRAND</div>
                    <div className='nom-contact'>Jean MARTIN</div>
                    <div className='nom-contact'>Claire DURAND</div>
                    <div className='nom-contact'>Paul LEROY</div>
                </div>
                <div className='discussions'>
                    <div className='message '>
                        <div className='message-nom message-nom-contact'>Nom</div>
                        <div className='message-contenu message-contact'>
                            Bonjour Marie, merci de me consacrer du temps. J’ai bien avancé sur mon projet de plateforme de gestion des stocks pour les petits commerces, mais j’ai encore des doutes sur certains aspects.
                        </div>
                    </div>

                    <div className='message '>
                        <div className='message-nom message-nom-moi'>Moi</div>
                        <div className='message-contenu message-moi'>
                            Bonjour Lucas, c’est avec plaisir ! Raconte-moi où tu en es et quelles sont tes principales interrogations.
                        </div>
                    </div>

                    <div className='message '>
                        <div className='message-nom message-nom-contact'>Nom</div>
                        <div className='message-contenu message-contact'>
                            J’ai une version fonctionnelle du logiciel et quelques commerçants intéressés, mais j’hésite sur ma stratégie de commercialisation. Dois-je d’abord proposer un essai gratuit ou directement vendre mon service ?
                        </div>
                    </div>

                    <div className='message '>
                        <div className='message-nom message-nom-moi'>Moi</div>
                        <div className='message-contenu message-moi'>
                            <div className='message-bulle'>Bonne question ! À ce stade, le plus important est de valider que ton produit répond bien aux attentes des commerçants. Un essai gratuit peut être un bon moyen d’attirer des utilisateurs et de recueillir leurs retours. As-tu déjà défini un modèle économique ?</div>
                        </div>
                    </div>
                    <div className='message '>
                        <div className='message-nom message-nom-contact'>Nom</div>
                        <div className='message-contenu message-contact'>
                            Oui, je pensais partir sur un abonnement mensuel, mais j’ai peur que ce soit un frein pour des petits commerces aux marges serrées.
                        </div>
                    </div>

                    <div className='message '>
                        <div className='message-nom message-nom-moi'>Moi</div>
                        <div className='message-contenu message-moi'>
                            C’est une bonne approche, mais tu pourrais aussi proposer une offre freemium : une version gratuite avec des fonctionnalités limitées et une version payante pour les outils avancés. Ça te permettrait d’attirer plus de monde et de les convertir progressivement.
                        </div>
                    </div>
                </div>
            </section>
        </Wrapper>

    )
}

export default Messages;