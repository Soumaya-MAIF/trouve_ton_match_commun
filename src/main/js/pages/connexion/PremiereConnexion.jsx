import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChampSaisie } from "../../components/champ-saisie/ChampSaisie";
import Wrapper from "../../wrapper/Index";

const codeAccesRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const PremiereConnexion = () => {
  const [utilisateurDto, setUtilisateurDto] = useState({
    email: "",
    codeUtilisateur: "",
  });

  const location = useLocation(); // Pour suivre le changement de route

  // Créer une référence pour le champ 'email'
  const emailInputRef = useRef(null);

  // Utiliser useEffect pour appliquer le focus au champ 'Nom' lors du montage du composant
  useEffect(() => {
    if (emailInputRef.current) {
      console.log("Référence du champ Email :", emailInputRef.current);
      emailInputRef.current.focus();
    }
  }, []);

  const [errors, setErrors] = useState({});
  const [userNotFound, setUserNotFound] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!utilisateurDto.email) newErrors.email = "L'email est requis";
    if (!utilisateurDto.codeUtilisateur) newErrors.codeUtilisateur = "Le code d'accès est requis";

    return newErrors;
  };

  const handleChange = (name, value) => {
    setUtilisateurDto({
      ...utilisateurDto,
      [name]: value,
    });

    const newErrors = { ...errors };
    if (value.trim() === "") {
      newErrors[name] = "Ce champ est requis";
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);

    // Réinitialiser userNotFound à false lorsque l'utilisateur modifie un champ
    setUserNotFound(false);
  };

  const API_BASE_URL = "http://localhost:8080/api";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation des champs
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Requête pour vérifier l'existence de l'utilisateur
    fetch(`${API_BASE_URL}/auth/firstLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: utilisateurDto.email,
        code_acces: utilisateurDto.codeUtilisateur,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/mot-de-passe");
        } else {
          setUserNotFound(true); // Afficher le message "Utilisateur inconnu"
        }
      })
      // .then(data => {
      //     if (data.idUtilisateur) {
      //         localStorage.setItem('idUtilisateur', data.idUtilisateur);

      //         // Mettez à jour l'état ici après avoir reçu la réponse
      //         setUtilisateurDto({
      //             idUtilisateur: data.idUtilisateur, // Assurez-vous que l'ID est récupéré correctement
      //         });

      //         navigate('/mot-de-passe');
      //     } else {
      //         setUserNotFound(true); // Afficher le message "Utilisateur inconnu"
      //     }
      // })
      .catch((error) => {
        console.error("Erreur lors de la soumission du formulaire!", error);
      });
  };

  return (
    <Wrapper>
      <div className="titre">Première connexion</div>
      <div className="espace"></div>
      <form onSubmit={handleSubmit} className="form-container">
        {errors.email && <div className="message-erreur">{errors.email}</div>}
        <ChampSaisie
          setValue={(value) => handleChange("email", value)}
          label="Email :"
          name="email"
          value={utilisateurDto.email}
          regex={emailRegex}
          ref={emailInputRef}
          placeholder="DUPONT"
        />
        <div className="espace"></div>

        {errors.codeUtilisateur && <div className="message-erreur">{errors.codeUtilisateur}</div>}
        <ChampSaisie
          setValue={(value) => handleChange("codeUtilisateur", value)}
          label="Code d'accès :"
          name="codeUtilisateur"
          value={utilisateurDto.codeUtilisateur}
          regex={codeAccesRegex}
          placeholder="A123"
        />
        <div className="espace"></div>

        <div className="position-bouton">
          {userNotFound && (
            <div>
              <input className="error-input" value="Utilisateur inconnu" disabled />
            </div>
          )}
          <button type="submit" className="bouton-bas-page">
            Suivant
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default PremiereConnexion;
