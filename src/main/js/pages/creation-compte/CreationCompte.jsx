import Wrapper from "../../wrapper/Index";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import { ChampSaisie } from "../../components/champ-saisie/ChampSaisie.jsx";
import "./creation-compte.css";
import "./../../components/global.css";
import { ChampInfo } from "../../components/champ-info/ChampInfo.jsx";
import { useAuth } from "../../components/context/AuthContext.jsx";

const otherRegex = /^[a-zA-ZÀ-ÿ\- ]{1,}$/; // minimum 2 caractères pour les autres champs
const nomRegex = /^[A-ZÀ-ÿ\- ]{2,}$/; // NOM en MAJUSCULES
const prenomRegex = /^[A-ZÀ-Ÿ][a-zà-ÿ'-]{1,49}$/; // PRENOM en MAJUSCULES et minuscules, avec un tiret ou apostrophe autorisés
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regex pour valider les emails
const codeRegex = /^[a-zA-ZÀ-ÿ\- ]{1}\d{3}$/; // code admis :  1 lettre suivie de 3 chiffres
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const CreationCompte = () => {
  // Initialisation des états des valeurs de utilisateurDto
  const [utilisateurDto, setUtilisateurDto] = useState({
    nom: "",
    prenom: "",
    entreprise: "",
    type: "",
    role: "",
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [codeAcces, setCodeAcces] = useState(null);
  const location = useLocation(); // Ce hook permet d’accéder à l’objet location qui représente l’URL actuelle de l’application

  // Créer une référence pour le champ 'nom'
  const nomInputRef = useRef(null);

  // Utiliser useEffect pour appliquer le focus au champ 'Nom' lors du montage du composant
  useEffect(() => {
    if (nomInputRef.current) {
      console.log("Référence du champ Nom :", nomInputRef.current);
      nomInputRef.current.focus();
    }
  }, []);

  // Réinitialisation des états des valeurs de utilisateurDto
  // lorsque le composant est monté (c’est-à-dire lorsque la page est chargée ou actualisée).
  useEffect(() => {
    setUtilisateurDto({
      nom: "",
      prenom: "",
      entreprise: "",
      type: "",
      role: "",
      email: "",
    });

    setIsSubmitted(false);
  }, [location]); // A chaque fois que l’URL change (info connue grâce à l'objet location), le useEffect est déclenché pour réinitialiser la page.

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!utilisateurDto.nom) newErrors.nom = "Le nom est requis";
    if (!utilisateurDto.prenom) newErrors.prenom = "Le prénom est requis";
    if (!utilisateurDto.entreprise) newErrors.entreprise = "L'entreprise est requise";
    if (!utilisateurDto.role) newErrors.role = "Le role est requis";
    if (!utilisateurDto.type) newErrors.type = "Le type de profil est requis";

    return newErrors;
  };

  const { auth } = useAuth();

  // Met à jour dynamiquement les propriétés de utilisateurDto à chaque changer de valeur
  const handleChange = (name, value) => {
    setUtilisateurDto({
      ...utilisateurDto, // L’opérateur de décomposition (...utilisateurDto) est utilisé pour copier toutes les propriétés existantes de utilisateurDto.
      [name]: value,
    });

    // Validation des champs
    const newErrors = { ...errors };
    if (value.trim() === "") {
      newErrors[name] = "Ce champ est requis";
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

    if (utilisateurDtoCopy.role === "ADMINISTRATEUR" || !utilisateurDtoCopy.role) {
      delete utilisateurDtoCopy.type; // Supprime la propriété "type" si le rôle est "ADMINISTRATEUR"
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
      body: JSON.stringify(utilisateurDtoCopy),
    })
      .then((response) => {
        console.log("Réponse du serveur:", response); // reponse du serveur après la requête
        if (!response.ok) {
          setIsSubmitted(true); // Masquer le bouton après l'envoi
          return response.json().then((err) => {
            throw new Error(err.message || "Erreur inconnue");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCodeAcces(data.code_acces);
      })
      .catch((error) => {
        console.error("Erreur lors de la soumission du formulaire!", error);
      });
  };

  return (
    <Wrapper>
      <div className="titre">Création d'un compte</div>
      <form onSubmit={handleSubmit} className="form-container">
        {errors.nom && <div className="message-erreur">{errors.nom}</div>}
        <ChampSaisie
          setValue={(value) => handleChange("nom", value)}
          label="Nom :"
          name="nom"
          value={utilisateurDto.nom}
          regex={otherRegex}
          ref={nomInputRef}
          placeholder="DUPONT"
        />

        {errors.prenom && <div className="message-erreur">{errors.prenom}</div>}
        <ChampSaisie
          setValue={(value) => handleChange("prenom", value)}
          label="Prenom :"
          name="prenom"
          value={utilisateurDto.prenom}
          regex={otherRegex}
          placeholder="Laurent"
        />

        {errors.email && <div className="message-erreur">{errors.email}</div>}
        <ChampSaisie
          setValue={(value) => handleChange("email", value)}
          value={utilisateurDto.email}
          label="Email :"
          name="email"
          regex={emailRegex}
          placeholder="laurent.dupont@test.fr"
        />

        {errors.entreprise && <div className="message-erreur">{errors.entreprise}</div>}
        <ChampSaisie
          setValue={(value) => handleChange("entreprise", value)}
          value={utilisateurDto.entreprise}
          label="Entreprise (entreprise représentée en tant que membre d’Initiative Deux-Sèvres) :"
          name="entreprise"
          regex={otherRegex}
          placeholder="Tartempion"
        />

        {errors.role && <div className="message-erreur">{errors.role}</div>}
        <div className="form-radio-type">
          <label className="radio-label">
            <input
              type="radio"
              name="role"
              value="UTILISATEUR"
              checked={utilisateurDto.role === "UTILISATEUR"}
              onChange={(e) => handleChange("role", e.target.value)}
              className="radio-input"
            />
            Utilisateur
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="role"
              value="ADMINISTRATEUR"
              checked={utilisateurDto.role === "ADMINISTRATEUR"}
              onChange={(e) => handleChange("role", e.target.value)}
              className="radio-input"
            />
            Administrateur
          </label>
        </div>

        {utilisateurDto.role === "UTILISATEUR" && (
          <>
            {errors.type && <div className="message-erreur">{errors.type}</div>}
            <div className="form-radio-type">
              <label className="radio-label">
                <input
                  type="radio"
                  name="type"
                  value="PARRAIN"
                  checked={utilisateurDto.type === "PARRAIN"}
                  onChange={(e) => handleChange("type", e.target.value)}
                  className="radio-input"
                />
                Parrain
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="type"
                  value="PORTEUR"
                  checked={utilisateurDto.type === "PORTEUR"}
                  onChange={(e) => handleChange("type", e.target.value)}
                  className="radio-input"
                />
                Porteur
              </label>
            </div>

            {utilisateurDto.type === "PORTEUR" && (
              <>
                {errors.match && <div className="message-erreur">{errors.match}</div>}
                <ChampSaisie
                  setValue={(value) => handleChange("plateforme", value)}
                  value={utilisateurDto.parrain}
                  label="Parrain :"
                  name="match"
                  regex={otherRegex}
                  placeholder="Nom du parrain"
                />
              </>
            )}
          </>
        )}

        <div className="position-bouton">
          <button type="submit" className="bouton-bas-page btn-compte">
            Envoyer
          </button>
        </div>

        {codeAcces != null && <ChampInfo label="Code d'accès :" name="code_acces" value={codeAcces} />}
      </form>
    </Wrapper>
  );
};

export default CreationCompte;
