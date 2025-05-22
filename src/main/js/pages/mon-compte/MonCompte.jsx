import Wrapper from '../../wrapper/Index';
import { useEffect, useState, useRef } from "react";
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { ChampSaisie } from '../../components/champ-saisie/ChampSaisie';
import './../../components/global.css';
import './mon-compte.css'
import { useAuth } from '../../AuthContext';

const otherRegex = /^[a-zA-ZÀ-ÿ\- ]{1,}$/; // minimum 2 caractères pour les autres champs
const nomRegex = /^[A-ZÀ-ÿ\- ]{2,}$/; // NOM en MAJUSCULES
const codeRegex = /^[a-zA-ZÀ-ÿ\- ]{1}\d{3}$/; // code admis :  1 lettre suivie de 3 chiffres

const MonCompte = () => {

    const { isAuthenticated, isAdmin, logout } = useAuth();  // Récupérer les états et fonctions du contexte
    console.log('Header rendu avec isAuthenticated:', isAuthenticated, 'isAdmin:', isAdmin); // Log pour vérifier les états

    const [monCompteDto, setMonCompteDto] = useState({
        id: '',
        nom: '',
        premnom: '',
        // email: '',
        presentation: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const location = useLocation(); // Ce hook permet d’accéder à l’objet location qui représente l’URL actuelle de l’application 
    const navigate = useNavigate();

    const id = localStorage.getItem('id');
    console.log('recupération de id:', id);

    // Créer une référence pour le champ 'nomUtilisateur'
    const presInputRef = useRef(null);

    // Utiliser useEffect pour appliquer le focus au champ 'Presentation' lors du montage du composant
    useEffect(() => {
        if (presInputRef.current) {
            console.log('Référence du champ Présentation :', presInputRef.current);
            presInputRef.current.focus();
        }
    }, []);

    // Réinitialisation des états des valeurs de monCompteDto
    // lorsque le composant est monté (c’est-à-dire lorsque la page est chargée ou actualisée).
    useEffect(() => {
        setMonCompteDto({
            id: id,  // Initialisation de monCompteDto.id avec l'id du localStorage.
            nom: '',
            prenom: '',
            // email: '',
            presentation: ''
        });

        setIsSubmitted(false);
    }, [location]); // A chaque fois que l’URL change (info connue grâce à l'objet location), le useEffect est déclenché pour réinitialiser la page.

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données utilisateur');
                }

                const data = await response.json();
                console.log('Données utilisateur récupérées:', data);

                setMonCompteDto({
                    id: data.id || '',
                    nom: data.nom || '',
                    prenom: data.prenom || '',
                    email: data.email || '',
                    presentation: data.presentation || '',
                });
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur:', error);
            }
        };

        if (id) {
            fetchUserData();
        }
    }, [id]);

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!monCompteDto.nom || monCompteDto.nom.trim() === '') {
            newErrors.nom = 'Le nom est requis';
        }
        if (!monCompteDto.prenom || monCompteDto.prenom.trim() === '') {
            newErrors.prenom = 'Le prénom est requis';
        }
        // if (!monCompteDto.email || monCompteDto.email.trim() === '') {
        //     newErrors.email = 'L\'email est requis';
        // }
        if (!monCompteDto.presentation || monCompteDto.presentation.trim() === '') {
            newErrors.présentation = 'Vous devez vous présenter et/ou présenter votre projet';
        }

        return newErrors;
    };


    // Met à jour dynamiquement les propriétés de monCompteDto à chaque changer de valeur
    const handleChange = (name, value) => {
        setMonCompteDto({
            ...monCompteDto,
            // L’opérateur de décomposition (...monCompteDto) est utilisé pour copier toutes les propriétés existantes de monCompteDto.
            [name]: value
        });
        console.log("Valeurs mises à jour:", { ...monCompteDto, [name]: value }); // Log des valeurs mises à jour

        // Validation des champs
        const newErrors = { ...errors };
        if (value.trim() === '') {
            newErrors[name] = 'Ce champ est requis';
        } else {
            delete newErrors[name];
        }
        setErrors(newErrors);
    };


    // Envoie des données de l’utilisateur au serveur, reception de la réponse contenant l’ID de l’utilisateur créé, 
    // et mise à jour l’état local avec cet ID. 
    // Cela permet de garder l’interface utilisateur synchronisée avec les données du serveur.
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Formulaire soumis"); // Formulaire soumis

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            console.log("Erreurs de validation:", validationErrors); // Tous les champs sont-ils remplis ?
            setErrors(validationErrors);
            return;
        }

        console.log("Données envoyées:", monCompteDto);
        console.log("Données envoyées (JSON.stringify):", JSON.stringify(monCompteDto));
        fetch(`http://localhost:8080/user/monCompte/${monCompteDto.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(monCompteDto)
        })
            .then(response => {
                console.log("Réponse du serveur:", response);  // reponse du serveur après la requête
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message || 'Erreur inconnue'); });
                }
                return response.json();
            })
            .then(data => {
                console.log("Données reçues du serveur:", data);
                if (data && data.id) {
                    console.log('Utilisateur trouvé, id:', data.id);
                    console.log('Nom:', data.nom);

                    // Mettez à jour l'état ici après avoir reçu la réponse
                    setMonCompteDto({
                        id: data.id, // Assurez-vous que l'ID est récupéré correctement
                        nom: data.nom || '',
                        prenom: data.prenom || '',
                        email: data.email || '',
                        presentation: data.presentation || '',
                    });
                    setIsSubmitted(true); // Indique que la mise à jour a réussi

                    // Vérifiez si le type de l'utilisateur est "monCompte" avant de naviguer
                    navigate('/'); // Rediriger vers la page : Accueil 
                } else {
                    console.log("else data.exists")
                    // setUserNotFound(true); // Afficher le message "Utilisateur inconnu"
                }
            })
            .catch(error => {
                console.error('Erreur lors de la soumission du formulaire!', error);
                setErrors({ server: 'Une erreur est survenue lors de la mise à jour de vos informations. Veuillez réessayer.' });
            });
    }

    return (
        <Wrapper>
            <div className='container-mon-compte'>

                <div className='titre'>Mon compte</div>
                <form onSubmit={handleSubmit} className='form-container'>

                    {errors.nom && <div className="message-erreur">{errors.nom}</div>}
                    <ChampSaisie
                        setValue={(value) => handleChange('nom', value)}
                        label="Nom :"
                        name="nom"
                        value={monCompteDto.nom}
                        regex={otherRegex}
                        // placeholder="Deuxième semestre 2025"
                        />

                    {errors.prenom && <div className="message-erreur">{errors.prenom}</div>}
                    <ChampSaisie
                        setValue={(value) => handleChange('prenom', value)}
                        label="Prénom :"
                        name="prenom"
                        value={monCompteDto.prenom}
                        regex={otherRegex}
                        // placeholder="Métiers de l'automobile"
                        />

                    {/* {errors.email && <div className="message-erreur">{errors.email}</div>}
                    <ChampSaisie
                        setValue={(value) => handleChange('email', value)}
                        label="Email :"
                        name="email"
                        value={monCompteDto.email}
                        regex={otherRegex}
                        readOnly={true} // Empêche la modification
                        // placeholder="Garage automobile : vente, mécanique, carrosserie "
                        /> */}

                    {errors.presentation && <div className="message-erreur">{errors.presentation}</div>}
                    <ChampSaisie
                        setValue={(value) => handleChange('presentation', value)}
                        label="Présentation :"
                        name="presentation"
                        value={monCompteDto.presentation}
                        regex={otherRegex}
                        ref={presInputRef}
                        placeholder="Je vais me présenter, et présenter mon projet ou bien en quoi je peux apporter mon expertise ..."
                        />

                    {errors.server && <div className="message-erreur">{errors.server}</div>}
                    {isSubmitted && <div className="message-confirmation">Vos informations ont été mises à jour avec succès.</div>}

                    <div className='btn-row'>
                        <div className="btn">
                            <button type="submit" className='btn-enregistrer'>
                                Enregistrer
                            </button>
                        </div>
                        {/* <div className="btn">
                            <button type="submit" className='btn-suivant'>
                                Suivant
                            </button>
                        </div> */}
                    </div>
                </form>
            </div>
        </Wrapper>
    )
}

export default MonCompte;