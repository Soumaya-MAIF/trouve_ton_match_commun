import Wrapper from '../../wrapper/Index';
import { useEffect, useState, useRef } from "react";
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { ChampSaisie } from '../../components/champ-saisie/ChampSaisie';
import './../../components/global.css';
import './mon-compte.css'
// import { useAuth } from '../../AuthContext';

const otherRegex = /^[a-zA-ZÀ-ÿ\- ]{1,}$/; // minimum 2 caractères pour les autres champs
const nomRegex = /^[A-ZÀ-ÿ\- ]{2,}$/; // NOM en MAJUSCULES
const codeRegex = /^[a-zA-ZÀ-ÿ\- ]{1}\d{3}$/; // code admis :  1 lettre suivie de 3 chiffres

const MonCompteParrain = () => {

    const [parrainDto, setParrainDto] = useState({
        idUtilisateur: '',
        dateLancement: '',
        domaineActivite: '',
        descriptifActivite: '',
        besoinsPotentiels: '',
        lieuActivite: '',
        disponibilites: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const location = useLocation(); // Ce hook permet d’accéder à l’objet location qui représente l’URL actuelle de l’application 
    const navigate = useNavigate();

    const idUtilisateur = localStorage.getItem('idUtilisateur');
    console.log('recupération de idUtilisateur:', idUtilisateur);

    // Créer une référence pour le champ 'nomUtilisateur'
    const nomInputRef = useRef(null);

    // Utiliser useEffect pour appliquer le focus au champ 'Nom' lors du montage du composant
    useEffect(() => {
        if (nomInputRef.current) {
            console.log('Référence du champ Nom :', nomInputRef.current);
            nomInputRef.current.focus();
        }
    }, []);

    // Réinitialisation des états des valeurs de parrainDto
    // lorsque le composant est monté (c’est-à-dire lorsque la page est chargée ou actualisée).
    useEffect(() => {
        setParrainDto({
            idUtilisateur: idUtilisateur,
            dateLancement: '',
            domaineActivite: '',
            descriptifActivite: '',
            besoinsPotentiels: '',
            lieuActivite: '',
            disponibilites: '',
        });

        setIsSubmitted(false);
    }, [location]); // A chaque fois que l’URL change (info connue grâce à l'objet location), le useEffect est déclenché pour réinitialiser la page.

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!parrainDto.dateLancement || parrainDto.dateLancement.trim() === '') newErrors.dateLancement = 'La présentation du parcours est requis';
        if (!parrainDto.domaineActivite || parrainDto.domaineActivite.trim() === '') newErrors.domaineActivite = 'Le type de réseau est requis';
        if (!parrainDto.descriptifActivite || parrainDto.descriptifActivite.trim() === '') newErrors.descriptifActivite = 'Le domaine d\'expertise est requis';
        if (!parrainDto.besoinsPotentiels || parrainDto.besoinsPotentiels.trim() === '') newErrors.besoinsPotentiels = 'Le secteur géographique est requis';
        if (!parrainDto.lieuActivite || parrainDto.lieuActivite.trim() === '') newErrors.lieuActivite = 'Les disponibilités sont requises';
        if (!parrainDto.disponibilites || parrainDto.disponibilites.trim() === '') newErrors.disponibilites = 'Les disponibilités sont requises';

        return newErrors;
    };


    // Met à jour dynamiquement les propriétés de parrainDto à chaque changer de valeur
    const handleChange = (name, value) => {
        setParrainDto({
            ...parrainDto,
            // L’opérateur de décomposition (...parrainDto) est utilisé pour copier toutes les propriétés existantes de parrainDto.
            [name]: value
        });
        console.log("Valeurs mises à jour:", { ...parrainDto, [name]: value }); // Log des valeurs mises à jour

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

        console.log("Données envoyées:", parrainDto);
        console.log("Données envoyées (JSON.stringify):", JSON.stringify(parrainDto));
        fetch('http://localhost:8080/creationCompte/completercompteparrain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parrainDto)
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
                if (data && data.idUtilisateur) {
                    console.log('Utilisateur trouvé, id:', data.idUtilisateur);
                    console.log('dateLancement:', data.dateLancement);

                    // Mettez à jour l'état ici après avoir reçu la réponse
                    setParrainDto({
                        idUtilisateur: data.idUtilisateur, // Assurez-vous que l'ID est récupéré correctement
                        dateLancement: data.dateLancement || '',
                        domaineActivite: data.domaineActivite || '',
                        descriptifActivite: data.descriptifActivite || '',
                        besoinsPotentiels: data.besoinsPotentiels || '',
                        lieuActivite: data.lieuActivite || '',
                        disponibilites: data.disponibilites || '',
                        type: data.type || '', // Ajoutez le type si nécessaire
                    });

                    // Vérifiez si le type de l'utilisateur est "parrain" avant de naviguer
                    navigate('/filtres'); // Rediriger vers la page : filtres -> "Secteurs/Réseaux et Type d'accompagnement"
                } else {
                    console.log("else data.exists")
                    // setUserNotFound(true); // Afficher le message "Utilisateur inconnu"
                }
            })
            .catch(error => {
                console.error('Erreur lors de la soumission du formulaire!', error);
            });
    }

    return (
        <Wrapper>
            <div className='container-mon-compte'>

                <div className='titre'>Mon compte</div>
                <form onSubmit={handleSubmit} className='form-container'>

                    {errors.dateLancement && <div className="message-erreur">{errors.dateLancement}</div>}
                    <ChampSaisie
                        setValue={(value) => handleChange('dateLancement', value)}
                        label="Date de lancement (reprise de l'activité) :"
                        name="dateLancement"
                        value={parrainDto.dateLancement}
                        regex={otherRegex}
                        ref={nomInputRef}
                        placeholder="Deuxième semestre 2025"
                    />

                    {errors.domaineActivite && <div className="message-erreur">{errors.domaineActivite}</div>}
                    <ChampSaisie
                        setValue={(value) => handleChange('domaineActivite', value)}
                        label="Domaine d'activité :"
                        name="domaineActivite"
                        value={parrainDto.domaineActivite}
                        regex={otherRegex}
                        placeholder="Métiers de l'automobile"
                    />

                    {errors.descriptifActivite && <div className="message-erreur">{errors.descriptifActivite}</div>}
                    <ChampSaisie
                        setValue={(value) => handleChange('descriptifActivite', value)}
                        label="Descriptif de l'activité :"
                        name="descriptifActivite"
                        value={parrainDto.descriptifActivite}
                        regex={otherRegex}
                        placeholder="Garage automobile : vente, mécanique, carrosserie "
                    />

                    {errors.besoinsPotentiels && <div className="message-erreur">{errors.besoinsPotentiels}</div>}
                    <ChampSaisie
                        setValue={(value) => handleChange('besoinsPotentiels', value)}
                        label="Besoins potentiels :"
                        name="besoinsPotentiels"
                        value={parrainDto.besoinsPotentiels}
                        regex={otherRegex}
                        placeholder="La comptabilté, le droit du travail, le marketing, les ressources humaines, la logistique, l'infrastructure informatique, ..."
                    />

                    {errors.lieuActivite && <div className="message-erreur">{errors.lieuActivite}</div>}
                    <ChampSaisie
                        setValue={(value) => handleChange('lieuActivite', value)}
                        label="Lieu de l'activité:"
                        name="lieuActivite"
                        value={parrainDto.lieuActivite}
                        regex={otherRegex}
                        placeholder="Melle"
                    />

                    {errors.disponibilites && <div className="message-erreur">{errors.disponibilites}</div>}
                    <ChampSaisie
                        setValue={(value) => handleChange('disponibilites', value)}
                        label="Disponibilités :"
                        name="disponibilites"
                        value={parrainDto.disponibilites}
                        regex={otherRegex}
                        placeholder="Du lundi au jeudi : 9h-12h / 13h-17h"
                    />

                    <div className='btn-row'>
                        <div className="btn">
                            <button type="submit" className='btn-enregistrer'>
                                Enregistrer
                            </button>
                        </div>
                        <div className="btn">
                            <button type="submit" className='btn-suivant'>
                                Suivant
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Wrapper>
    )
}

export default MonCompteParrain;