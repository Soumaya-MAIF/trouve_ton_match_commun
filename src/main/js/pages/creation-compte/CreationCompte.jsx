import Wrapper from '../../wrapper/Index';
import { useEffect, useState, useRef } from "react";
import { useLocation } from 'react-router';
import { ChampSaisie } from '../../components/champ-saisie/ChampSaisie.jsx';
import './creation-compte.css';
import './../../components/global.css';

const otherRegex = /^[a-zA-ZÀ-ÿ\- ]{1,}$/; // minimum 2 caractères pour les autres champs
const nomRegex = /^[A-ZÀ-ÿ\- ]{2,}$/; // NOM en MAJUSCULES
const codeRegex = /^[a-zA-ZÀ-ÿ\- ]{1}\d{3}$/; // code admis :  1 lettre suivie de 3 chiffres

const CreationCompte = () => {

    // Initialisation des états des valeurs de utilisateurDto
    const [utilisateurDto, setUtilisateurDto] = useState({
        idUtilisateur: '',
        nom: '',
        prenom: '',
        email: '',
        entreprise: '',
        // plateformeUtilisateur: '',
        role: '',
        type: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const location = useLocation(); // Ce hook permet d’accéder à l’objet location qui représente l’URL actuelle de l’application 

    // Créer une référence pour le champ 'nom'
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
            id: '',
            nom: '',
            prenom: '',
            email: '',
            entreprise: '',
            // plateformeUtilisateur: '',
            role: '',
            type: ''
        });

        setIsSubmitted(false);
    }, [location]); // A chaque fois que l’URL change (info connue grâce à l'objet location), le useEffect est déclenché pour réinitialiser la page.

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!utilisateurDto.nom) newErrors.nom = 'Le nom est requis';
        if (!utilisateurDto.prenom) newErrors.prenom = 'Le prénom est requis';
        if (!utilisateurDto.email) newErrors.email = 'L\'email est requise';
        if (!utilisateurDto.entreprise) newErrors.entreprise = 'L\'entreprise est requise';
        // if (!utilisateurDto.plateforme) newErrors.plateforme = 'La plateforme est requise';
        if (!utilisateurDto.role) newErrors.role = 'Le role de l\'utlisateur est requis';
        // if (!utilisateurDto.type) newErrors.type = 'Le type de profil est requis';

        // Vérifiez si le champ "type" est requis en fonction du rôle
        if (utilisateurDto.role === 'UTILISATEUR' && !utilisateurDto.type) {
            newErrors.type = 'Le type est requis pour les utilisateurs';
        }
        

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

        const utilisateurDtoCopy = { ...utilisateurDto }; // Crée une copie de utilisateurDto

        if (utilisateurDtoCopy.role === 'ADMINISTRATEUR' || !utilisateurDtoCopy.role) {
            delete utilisateurDtoCopy.type; // Supprime la propriété "type" si le rôle est "ADMINISTRATEUR"
        }
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        console.log("JSON.stringify(utilisateurDto):" + JSON.stringify(utilisateurDtoCopy))

        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(utilisateurDtoCopy)
        })
            .then(response => {
                console.log("Réponse du serveur:", response);  // reponse du serveur après la requête
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message || 'Erreur inconnue'); });
                }
                return response.json();
            })
            .then(data => {
                console.log('Utilisateur créé:', data);

                setUtilisateurDto(prevState => ({
                    ...prevState,
                    id: data.id // Met à jour id tout en conservant les autres propriétés
                }));

                console.log('id:', utilisateurDto);
                console.log('Type de id:', typeof data.id);
                console.log('id:', data.id); // Ok
                localStorage.setItem('id', data.id); // Stockage de l'id
                console.log('id:', utilisateurDto.id);
                console.log('nom:', utilisateurDto.nom);
                console.log('type:', utilisateurDto.type);

                setIsSubmitted(true); // Masquer le bouton après l'envoi
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

                {errors.email && <div className="message-erreur">{errors.email}</div>}
                <ChampSaisie
                    setValue={(value) => handleChange('email', value)}
                    value={utilisateurDto.email}
                    label="Email :"
                    name="email"
                    regex={otherRegex}
                    placeholder="laurent.dupont@test.fr"
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

                {/* {errors.plateforme && <div className="message-erreur">{errors.plateforme}</div>}
                <ChampSaisie
                    setValue={(value) => handleChange('plateforme', value)}
                    value={utilisateurDto.plateforme}
                    label="Plateforme Initiative :"
                    name="plateforme"
                    regex={otherRegex}
                    placeholder="Initiative Deux-Sèvres"
                /> */}

                {/* {errors.code && <div className="message-erreur">{errors.code}</div>}
                <ChampSaisie
                    setValue={(value) => handleChange('code', value)}
                    value={utilisateurDto.code}
                    label="Code d'accès :"
                    name="code"
                    regex={otherRegex}
                    placeholder="A123"
                /> */}

                {errors.role && <div className="message-erreur">{errors.role}</div>}
                <div className="form-radio-role">
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
                        Administrateur
                    </label>
                </div>

                {(utilisateurDto.role === "UTILISATEUR") ? (
                    <>
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
                    </>
                ) : null }

                <div className="position-bouton">
                    {!isSubmitted ? (
                        <button
                            type="submit"
                            className="bouton-bas-page"
                        >
                            Envoyer
                        </button>
                    ) : (
                        // Affichage de l'id de l'utilisateur crée
                        <div className='row-creation'>
                            <div className="col-id">
                                <label htmlFor="id" className="form-label custom-label">Identifiant : </label>
                                <div className="custom-id">
                                    <input
                                        className="custom-id"
                                        disabled
                                        name="id"
                                        id="id"
                                        value={utilisateurDto.id}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </Wrapper>
    )
};

export default CreationCompte;