import Wrapper from '../../wrapper/Index';
import { useEffect, useState, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../AuthContext';


import { ChampSaisie } from './../../components/champ-saisie/ChampSaisie.jsx';
import './connexion.css';
import './../../components/global.css'

const otherRegex = /^[a-zA-ZÀ-ÿ\- ]{1,}$/; // minimum 2 caractères pour les autres champs
const nomRegex = /^[A-ZÀ-ÿ\- ]{2,}$/; // NOM en MAJUSCULES
const codeRegex = /^[a-zA-ZÀ-ÿ\- ]{1}\d{3}$/; // code admis :  1 lettre suivie de 3 chiffres

const Connexion = () => {

    const [utilisateurDto, setUtilisateurDto] = useState({
        nomUtilisateur: '',
        prenomUtilisateur: '',
        codeUtilisateur: '',
    });

    const location = useLocation(); // Pour suivre le changement de route

    // Créer une référence pour le champ 'nomUtilisateur'
    const nomInputRef = useRef(null);

    // Utiliser useEffect pour appliquer le focus au champ 'Nom' lors du montage du composant
    useEffect(() => {
        if (nomInputRef.current) {
            console.log('Référence du champ Nom :', nomInputRef.current);
            nomInputRef.current.focus();
        }
    }, []);

    const [errors, setErrors] = useState({});
    const [userNotFound, setUserNotFound] = useState(false);
    const navigate = useNavigate();
    // const { login } = useAuth(); ==================== A gérer

    const validate = () => {
        const newErrors = {};

        if (!utilisateurDto.nomUtilisateur) newErrors.nomUtilisateur = 'Le nom est requis';
        if (!utilisateurDto.prenomUtilisateur) newErrors.prenomUtilisateur = 'Le prénom est requis';
        if (!utilisateurDto.codeUtilisateur) newErrors.codeUtilisateur = 'Le code d\'accès est requis';

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
        fetch('http://localhost:8080/creationCompte/checkutilisateur', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(utilisateurDto)
        })
        .then(response => response.json())
        .then(data => {
            if (data.idUtilisateur) {
                console.log('Utilisateur trouvé, id:', data.idUtilisateur);
                console.log('Utilisateur trouvé, data:', data);

                localStorage.setItem('idUtilisateur', data.idUtilisateur);

                // Mettez à jour l'état ici après avoir reçu la réponse
                setUtilisateurDto({
                    idUtilisateur: data.idUtilisateur, // Assurez-vous que l'ID est récupéré correctement
                });

                //login(); // Mettre à jour l'état de connexion ================= A Gérer

                // Vérifiez si le type de l'utilisateur est "parrain" avant de naviguer
                console.log('Utilisateur trouvé, type:', data.typeUtilisateur);
                if (data.typeUtilisateur === 'parrain') {
                    navigate('/monCompteParrain'); // Rediriger vers la page "monCompteParrain"
                } else {
                    navigate('/monComptePorteur'); // Rediriger vers la page "monComptePorteur"
                }
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
            <div className='titre'>Connexion</div>
            <div className="espace"></div>
            <form onSubmit={handleSubmit} className='form-container'>

                {errors.nomUtilisateur && <div className="message-erreur">{errors.nomUtilisateur}</div>}
                <ChampSaisie
                    setValue={(value) => handleChange('nomUtilisateur', value)}
                    label="Nom :"
                    name="nomUtilisateur"
                    value={utilisateurDto.nomUtilisateur}
                    regex={otherRegex}
                    ref={nomInputRef}  
                    placeholder="DUPONT"
                />
                <div className="espace"></div>

                {errors.prenomUtilisateur && <div className="message-erreur">{errors.prenomUtilisateur}</div>}
                <ChampSaisie
                    setValue={(value) => handleChange('prenomUtilisateur', value)}
                    label="Prénom :"
                    name="prenomUtilisateur"
                    value={utilisateurDto.prenomUtilisateur}
                    regex={otherRegex}
                    placeholder="Laurent"
                />
                <div className="espace"></div>

                {errors.codeUtilisateur && <div className="message-erreur">{errors.codeUtilisateur}</div>}
                <ChampSaisie
                    setValue={(value) => handleChange('codeUtilisateur', value)}
                    label="Code d'accès :"
                    name="codeUtilisateur"
                    value={utilisateurDto.codeUtilisateur}
                    regex={otherRegex}
                    placeholder="A123"
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

export default Connexion;
