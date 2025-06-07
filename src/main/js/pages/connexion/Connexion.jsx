import Wrapper from '../../wrapper/Index';
import { useEffect, useState, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../AuthContext';


import { ChampSaisie } from './../../components/champ-saisie/ChampSaisie.jsx';
import './connexion.css';
import './../../components/global.css'



const Connexion = () => {

    
    
    return (
        // <Wrapper>
        //     <div className='titre'>Connexion</div>
        //     <div className="espace"></div>
        //     <form onSubmit={handleSubmit} className='form-container'>

        //         {errors.email && <div className="message-erreur">{errors.email}</div>}
        //         <ChampSaisie
        //             setValue={(value) => handleChange('email', value)}
        //             label="Email :"
        //             name="email"
        //             value={utilisateurDto.email}
        //             regex={emailRegex}
        //             ref={emailInputRef}  
        //             placeholder="DUPONT"
        //         />
        //         <div className="espace"></div>

        //         {errors.codeUtilisateur && <div className="message-erreur">{errors.codeUtilisateur}</div>}
        //         <ChampSaisie
        //             setValue={(value) => handleChange('codeUtilisateur', value)}
        //             label="Code d'accès :"
        //             name="codeUtilisateur"
        //             value={utilisateurDto.codeUtilisateur}
        //             regex={codeAccesRegex}
        //             placeholder="A123"
        //         />
        //         <div className="espace"></div>

        //         <div className="position-bouton">
        //             {userNotFound && (
        //                 <div>
        //                     <input
        //                         className="error-input"
        //                         value="Utilisateur inconnu"
        //                         disabled
        //                     />
        //                 </div>
        //             )}
        //             <button 
        //                 type="submit" 
        //                 className="bouton-bas-page">
        //                 Suivant
        //             </button>
        //         </div>
        //     </form>
        // </Wrapper>
        <div>
            <p>FORMULAIRE CONNEXION</p>
            </div>
    )
}

export default Connexion;
