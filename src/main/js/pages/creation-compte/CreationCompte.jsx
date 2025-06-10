import Wrapper from '../../wrapper/Index';
import { useEffect, useState, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { ChampSaisie } from '../../components/champ-saisie/ChampSaisie.jsx';
import './creation-compte.css';
import './../../components/global.css';

const otherRegex = /^[a-zA-ZÀ-ÿ\- ]{1,}$/; // minimum 2 caractères pour les autres champs
const nomRegex = /^[A-ZÀ-ÿ\- ]{2,}$/; // NOM en MAJUSCULES
const codeRegex = /^[a-zA-ZÀ-ÿ\- ]{1}\d{3}$/; // code admis :  1 lettre suivie de 3 chiffres
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const CreationCompte = () => {

    // Initialisation des états des valeurs de utilisateurDto
    const [utilisateurDto, setUtilisateurDto] = useState({
        nom: '',
        prenom: '',
        entreprise: '',
        type: '',
        role: '',
        email: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const location = useLocation(); // Ce hook permet d’accéder à l’objet location qui représente l’URL actuelle de l’application 

    // Créer une référence pour le champ 'nomUtilisateur'
    const nomInputRef = useRef(null);

    // Utiliser useEffect pour appliquer le focus au champ 'Nom' lors du montage du composant
    useEffect(() => {
        if (nomInputRef.current) {
            console.log('Référence du champ Nom :', nomInputRef.current);
            nomInputRef.current.focus();
        }
    }, []); 

    // Réinitialisation des états des valeurs de utilisateurDto
    // lorsque le composant est monté (c’est-à-dire lorsque la page est chargée ou actualisée).
    useEffect(() => {
        setUtilisateurDto({
            nom: '',
            prenom: '',
            entreprise: '',
            type: '',
            role: '',
            email: ''
        });

        setIsSubmitted(false);
    }, [location]); // A chaque fois que l’URL change (info connue grâce à l'objet location), le useEffect est déclenché pour réinitialiser la page.

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!utilisateurDto.nom) newErrors.nom = 'Le nom est requis';
        if (!utilisateurDto.prenom) newErrors.prenom = 'Le prénom est requis';
        if (!utilisateurDto.entreprise) newErrors.entreprise = 'L\'entreprise est requise';
        if (!utilisateurDto.role) newErrors.role = 'Le role est requis';
        if (!utilisateurDto.type) newErrors.type = 'Le type de profil est requis';

        return newErrors;
    };


    // Met à jour dynamiquement les propriétés de utilisateurDto à chaque changer de valeur
    const handleChange = (name, value) => {
        setUtilisateurDto({
            ...utilisateurDto, // L’opérateur de décomposition (...utilisateurDto) est utilisé pour copier toutes les propriétés existantes de utilisateurDto.
            [name]: value
        });

        // Validation des champs
        const newErrors = { ...errors };
        if (value.trim() === '') {
            newErrors[name] = 'Ce champ est requis';
        } else {
            delete newErrors[name];
        }
        setErrors(newErrors);
    };

    // Envoie des données de l’utilisateur au serveur, reception de la réponse contenant l’ID de l’utilisateur créé, et mise à jour l’état local avec cet ID. 
    // Cela permet de garder l’interface utilisateur synchronisée avec les données du serveur.
    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        console.log("JSON.stringify(utilisateurDto):" + JSON.stringify(utilisateurDto))

        fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(utilisateurDto)
        })
            .then(response => {
                console.log("Réponse du serveur:", response);  // reponse du serveur après la requête
                if (!response.ok) {
                    setIsSubmitted(true); // Masquer le bouton après l'envoi
                    return response.json().then(err => { throw new Error(err.message || 'Erreur inconnue'); });
                }
                return response.json();
            })
            .catch(error => {
                console.error('Erreur lors de la soumission du formulaire!', error);
            });
    }

    return (
        <Wrapper>
            <div className='titre'>Creation compte</div>
            <form onSubmit={handleSubmit} className='form-container'>

                {errors.nom && <div className="message-erreur">{errors.nom}</div>}
                <ChampSaisie
                    setValue={(value) => handleChange('nom', value)}
                    label="Nom :"
                    name="nom"
                    value={utilisateurDto.nom}
                    regex={otherRegex}
                    ref={nomInputRef}
                    placeholder="DUPONT"
                />

                {errors.prenom && <div className="message-erreur">{errors.prenom}</div>}
                <ChampSaisie 
                    setValue={(value) => handleChange('prenom', value)} 
                    label="Prenom :" name="prenom" 
                    value={utilisateurDto.prenom} 
                    regex={otherRegex}
                    placeholder="Laurent"
                />

                {errors.entreprise && <div className="message-erreur">{errors.entreprise}</div>}
                <ChampSaisie 
                    setValue={(value) => handleChange('entreprise', value)} 
                    value={utilisateurDto.entreprise} 
                    label="Entreprise (entreprise représentée en tant que membre d’Initiative Deux-Sèvres) :" 
                    name="entreprise" 
                    regex={otherRegex}  
                    placeholder="Tartempion"
                />

                {errors.email && <div className="message-erreur">{errors.email}</div>}
                <ChampSaisie 
                    setValue={(value) => handleChange('email', value)} 
                    value={utilisateurDto.email} 
                    label="email :" 
                    name="email" 
                    regex={emailRegex} 
                    placeholder="mail@email.fr" 
                />

                {errors.type && <div className="message-erreur">{errors.type}</div>}
                <div className="form-radio-type">
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="type"
                            value="PARRAIN"
                            checked={utilisateurDto.type === 'PARRAIN'}
                            onChange={(e) => handleChange('type', e.target.value)}
                            className="radio-input"
                        />
                        Parrain
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="type"
                            value="PORTEUR"
                            checked={utilisateurDto.type === 'PORTEUR'}
                            onChange={(e) => handleChange('type', e.target.value)}
                            className="radio-input"
                        />
                        Porteur
                    </label>                       
                     
                </div>

                {errors.role && <div className="message-erreur">{errors.role}</div>}
                <div className="form-radio-type">
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="role"
                            value="UTILISATEUR"
                            checked={utilisateurDto.role === 'UTILISATEUR'}
                            onChange={(e) => handleChange('role', e.target.value)}
                            className="radio-input"
                        />
                        Utilisateur
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="role"
                            value="ADMINISTRATEUR"
                            checked={utilisateurDto.role === 'ADMINISTRATEUR'}
                            onChange={(e) => handleChange('role', e.target.value)}
                            className="radio-input"
                        />
                        Admin
                    </label>                       
                     
                </div>
                <button
                    type="submit"
                    className="bouton-bas-page">
                    Envoyer
                </button>
            </form>
        </Wrapper>
    )
};

export default CreationCompte;