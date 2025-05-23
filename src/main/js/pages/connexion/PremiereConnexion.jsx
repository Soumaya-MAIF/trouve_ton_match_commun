import Wrapper from '../../wrapper/Index.jsx';
import { useEffect, useState, useRef } from "react";
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { useAuth } from '../../AuthContext';


import { ChampSaisie } from '../../components/champ-saisie/ChampSaisie.jsx';
import './connexion.css';
import './../../components/global.css'

const otherRegex = /^[a-zA-ZÀ-ÿ\- ]{1,}$/; // minimum 2 caractères pour les autres champs
const nomRegex = /^[A-ZÀ-ÿ\- ]{2,}$/; // NOM en MAJUSCULES
const codeRegex = /^[a-zA-ZÀ-ÿ\- ]{1}\d{3}$/; // code admis :  1 lettre suivie de 3 chiffres
const codeAccesRegex = /^[a-z0-9-]+$/; // code admis :  1 lettre suivie de 3 chiffres  

const PremiereConnexion = () => {

    const [utilisateurDto, setUtilisateurDto] = useState({
        email: '',
        code_acces: '',
    });

    const location = useLocation(); // Pour suivre le changement de route

    // Créer une référence pour le champ 'email'
    const emailInputRef = useRef(null);

    // Utiliser useEffect pour appliquer le focus au champ 'Email' lors du montage du composant
    useEffect(() => {
        if (emailInputRef.current) {
            console.log('Référence du champ Email :', emailInputRef.current);
            emailInputRef.current.focus();
        }
    }, []);

    const [errors, setErrors] = useState({});
    const [userNotFound, setUserNotFound] = useState(false);
    const navigate = useNavigate();
    // const { login } = useAuth(); ==================== A gérer

    const validate = () => {
        const newErrors = {};

        if (!utilisateurDto.email) newErrors.email = 'L\'email est requis';
        if (!utilisateurDto.code_acces) newErrors.code_acces = 'Le code d\'accès est requis';

        return newErrors;
    };

    const handleChange = (name, value) => {
        setUtilisateurDto({
            ...utilisateurDto,
            [name]: value
        });

        const newErrors = { ...errors };
        if (value.trim() === '') {
            newErrors[name] = 'Ce champ est requis';
        } else {
            delete newErrors[name];
        }
        setErrors(newErrors);

        // Réinitialiser userNotFound à false lorsque l'utilisateur modifie un champ
        setUserNotFound(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation des champs
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Requête pour vérifier l'existence de l'utilisateur
        fetch('http://localhost:8080/firstLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(utilisateurDto)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Utilisateur trouvé, data:', data);
                console.log('Utilisateur trouvé, id:', data.id);
                console.log('Utilisateur trouvé, email:', data.email);

                // Stocker l'id utilisateur dans le localStorage
                localStorage.setItem('id', data.id);
 
                // Mise à jour de l'état local (stockage des infos utilisateur) après avoir reçu la réponse (permet de conserver l'id après le rechargement de la page ou une redirection)
                setUtilisateurDto({
                    ...utilisateurDto,
                    id: data.id,
                    email: data.email,
                    code_acces: data.code_acces
                });

                //login(); // Mettre à jour l'état de connexion ================= A Gérer

                navigate('/mot-de-passe'); // Rediriger vers la page "mot-de-passe"
            } else {
                setUserNotFound(true); // Afficher le message "Utilisateur inconnu"
            }
        })
        .catch(error => {
            console.error('Erreur lors de la soumission du formulaire!', error);
        });

    };
    
    return (
        <Wrapper>
            <div className='titre'>Première Connexion</div>
            <div className="espace"></div>
            <form onSubmit={handleSubmit} className='form-container'>

                {errors.email && <div className="message-erreur">{errors.email}</div>}
                <ChampSaisie
                    setValue={(value) => handleChange('email', value)}
                    label="Email :"
                    name="email"
                    value={utilisateurDto.email}
                    regex={otherRegex}
                    ref={emailInputRef}  
                    placeholder="laurent.dupont@test.fr"
                />
                <div className="espace"></div>

                {errors.code_acces && <div className="message-erreur">{errors.code_acces}</div>}
                <ChampSaisie
                    setValue={(value) => handleChange('code_acces', value)}
                    label="Code d'accès :"
                    name="code_acces"
                    value={utilisateurDto.code_acces}
                    regex={codeAccesRegex}
                    placeholder="aaa670d2-d285-4ca0-964b-b70f87c411bf"
                />
                <div className="espace"></div>

                <div className="position-bouton">
                    {userNotFound && (
                        <div>
                            <input
                                className="error-input"
                                value="Utilisateur inconnu"
                                disabled
                            />
                        </div>
                    )}
                    <button 
                        type="submit" 
                        className="bouton-bas-page">
                        Suivant
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}

export default PremiereConnexion;
