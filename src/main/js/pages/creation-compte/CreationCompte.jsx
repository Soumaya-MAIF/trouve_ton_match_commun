import Wrapper from '../../wrapper/Index';
import { useEffect, useState, useRef } from "react";
import { useLocation } from 'react-router-dom';
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
        nomUtilisateur: '',
        prenomUtilisateur: '',
        entrepriseUtilisateur: '',
        plateformeUtilisateur: '',
        codeUtilisateur: '',
        typeUtilisateur: ''
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
            idUtilisateur: '',
            nomUtilisateur: '',
            prenomUtilisateur: '',
            entrepriseUtilisateur: '',
            plateformeUtilisateur: '',
            codeUtilisateur: '',
            typeUtilisateur: ''
        });

        setIsSubmitted(false);
    }, [location]); // A chaque fois que l’URL change (info connue grâce à l'objet location), le useEffect est déclenché pour réinitialiser la page.

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!utilisateurDto.nomUtilisateur) newErrors.nomUtilisateur = 'Le nom est requis';
        if (!utilisateurDto.prenomUtilisateur) newErrors.prenomUtilisateur = 'Le prénom est requis';
        if (!utilisateurDto.entrepriseUtilisateur) newErrors.entrepriseUtilisateur = 'L\'entreprise est requise';
        if (!utilisateurDto.plateformeUtilisateur) newErrors.plateformeUtilisateur = 'La plateforme est requise';
        if (!utilisateurDto.codeUtilisateur) newErrors.codeUtilisateur = 'Le code d\'accès est requis';
        if (!utilisateurDto.typeUtilisateur) newErrors.typeUtilisateur = 'Le type de profil est requis';

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

        fetch('http://localhost:8080/creationCompte/createutilisateur', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(utilisateurDto)
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
                    idUtilisateur: data.idUtilisateur // Met à jour idUtilisateur tout en conservant les autres propriétés
                }));

                console.log('id:', utilisateurDto);
                console.log('Type de idUtilisateur:', typeof data.idUtilisateur);
                console.log('id:', data.idUtilisateur); // Ok
                localStorage.setItem('idUtilisateur', data.idUtilisateur); // Stockage de l'id
                console.log('id:', utilisateurDto.idUtilisateur);
                console.log('nom:', utilisateurDto.nomUtilisateur);
                console.log('type:', utilisateurDto.typeUtilisateur);

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

                {errors.nomUtilisateur && <div className="message-erreur">{errors.nomUtilisateur}</div>}
                <ChampSaisie
                    setValue={(value) => handleChange('nomUtilisateur', value)}
                    label="Nom :"
                    name="nomUtilisateur"
                    value={utilisateurDto.nomUtilisateur}
                    regex={otherRegex}
                    ref={nomInputRef}
                />

                {errors.prenomUtilisateur && <div className="message-erreur">{errors.prenomUtilisateur}</div>}
                <ChampSaisie setValue={(value) => handleChange('prenomUtilisateur', value)} label="Prenom :" name="prenomUtilisateur" value={utilisateurDto.prenomUtilisateur} regex={otherRegex} ></ChampSaisie>

                {errors.entrepriseUtilisateur && <div className="message-erreur">{errors.entrepriseUtilisateur}</div>}
                <ChampSaisie setValue={(value) => handleChange('entrepriseUtilisateur', value)} value={utilisateurDto.entrepriseUtilisateur} label="Entreprise (entreprise représentée en tant que membre d’Initiative Deux-Sèvres) :" name="entrepriseUtilisateur" regex={otherRegex}  ></ChampSaisie>

                {errors.plateformeUtilisateur && <div className="message-erreur">{errors.plateformeUtilisateur}</div>}
                <ChampSaisie setValue={(value) => handleChange('plateformeUtilisateur', value)} value={utilisateurDto.plateformeUtilisateur} label="Plateforme Initiative :" name="plateformeUtilisateur" regex={otherRegex}  ></ChampSaisie>

                {errors.codeUtilisateur && <div className="message-erreur">{errors.codeUtilisateur}</div>}
                <ChampSaisie setValue={(value) => handleChange('codeUtilisateur', value)} label="Code d'accès :" value={utilisateurDto.codeUtilisateur} name="codeUtilisateur" regex={otherRegex}  ></ChampSaisie>

                {errors.typeUtilisateur && <div className="message-erreur">{errors.typeUtilisateur}</div>}
                <div className="form-radio-type">
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="type"
                            value="parrain"
                            checked={utilisateurDto.typeUtilisateur === 'parrain'}
                            onChange={(e) => handleChange('typeUtilisateur', e.target.value)}
                            className="radio-input"
                        />
                        Parrain
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="type"
                            value="porteur"
                            checked={utilisateurDto.typeUtilisateur === 'porteur'}
                            onChange={(e) => handleChange('typeUtilisateur', e.target.value)}
                            className="radio-input"
                        />
                        Porteur
                    </label>
                </div>

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
                                <label htmlFor="idUtilisateur" className="form-label custom-label">Identifiant : </label>
                                <div className="custom-id">
                                    <input
                                        className="custom-id"
                                        disabled
                                        name="idUtilisateur"
                                        id="idUtilisateur"
                                        value={utilisateurDto.idUtilisateur}
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