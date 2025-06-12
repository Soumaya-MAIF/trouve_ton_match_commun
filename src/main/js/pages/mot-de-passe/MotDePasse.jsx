import Wrapper from '../../wrapper/Index.jsx';
import { useEffect, useState, useRef } from "react";
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { useAuth } from '../../components/context/AuthContext.jsx';


import { ChampSaisie } from '../../components/champ-saisie/ChampSaisie.jsx';
import './../connexion/connexion.css';
import './../../components/global.css'

const otherRegex = /^[a-zA-ZÀ-ÿ\- ]{1,}$/; // minimum 2 caractères pour les autres champs
const nomRegex = /^[A-ZÀ-ÿ\- ]{2,}$/; // NOM en MAJUSCULES
const codeRegex = /^[a-zA-ZÀ-ÿ\- ]{1}\d{3}$/; // code admis :  1 lettre suivie de 3 chiffres
const codeAccesRegex = /^[a-z0-9-]+$/; // code admis :  1 lettre suivie de 3 chiffres  
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regex pour valider les emails
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{4,}$/; // Regex pour valider les mots de passe (au moins 4 caractères, une majuscule, une minuscule et un chiffre) 

const MotDePasse = () => {

    const [utilisateurDto, setUtilisateurDto] = useState({
        email: '',
        password: '',
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
        if (!utilisateurDto.password) newErrors.password = 'Le mot de passe est requis';
        if (!utilisateurDto.confirmationPassword) {
            newErrors.confirmationPasswordmot_de_passe = 'La confirmation du mot de passe est requis';
        } else if (utilisateurDto.password !== utilisateurDto.confirmationPassword) {
            newErrors.confirmationPassword = 'Les mots de passe ne correspondent pas';
        }

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

        // Extraire les valeurs de utilisateurDto
        const { email, password } = utilisateurDto;

        // Requête pour vérifier l'existence de l'utilisateur
        fetch('http://localhost:8080/mot-de-passe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(utilisateurDto)
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Réponse du backend :', data);
                if (data.success) {
                    console.log(data.message); // Afficher le message de succès
                    //login(); // Mettre à jour l'état de connexion ================= A Gérer
                    navigate('/connexion'); // Rediriger vers la page "Connexion"
                } else {
                    console.error(data.message); // Afficher le message d'erreur
                    setUserNotFound(true); // Afficher le message "Utilisateur inconnu"
                }
            })
            .catch(error => {
                console.error('Erreur lors de la soumission du formulaire!', error);
            });

    };

    return (
        <Wrapper>
            <div className='titre'>Mot de passe</div>
            <div className="espace"></div>
            <form onSubmit={handleSubmit} className='form-container'>

                {errors.email && <div className="message-erreur">{errors.email}</div>}
                <ChampSaisie
                    setValue={(value) => handleChange('email', value)}
                    label="Email :"
                    name="email"
                    value={utilisateurDto.email}
                    regex={emailRegex}
                    ref={emailInputRef}
                    placeholder="laurent.dupont@test.fr"
                />
                <div className="espace"></div>

                {errors.password && <div className="message-erreur">{errors.password}</div>}
                <ChampSaisie
                    setValue={(value) => handleChange('password', value)}
                    label="Mot de passe :"
                    name="password"
                    value={utilisateurDto.password}
                    regex={passwordRegex}
                    placeholder="password"
                />
                <div className="espace"></div>

                {errors.confirmationPassword && <div className="message-erreur">{errors.confirmationPassword}</div>}
                <ChampSaisie
                    setValue={(value) => handleChange('confirmationPassword', value)}
                    label="Confirmation du mot de passe :"
                    name="confirmationPassword"
                    value={utilisateurDto.confirmationPassword}
                    regex={passwordRegex}
                    placeholder="password"
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

export default MotDePasse;
