import Wrapper from "../../wrapper/Index";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { ChampSaisie } from "./../../components/champ-saisie/ChampSaisie.jsx";
import "./connexion.css";
import "./../../components/global.css";
import { useAuth } from "../../components/context/AuthContext.jsx";

const Connexion = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const [utilisateurDto, setUtilisateurDto] = useState({
    email: "",
    mot_de_passe: "",
  });

  const location = useLocation(); // Pour suivre le changement de route

  // Créer une référence pour le champ 'email'
  const emailInputRef = useRef(null);

  // Utiliser useEffect pour appliquer le focus au champ 'Email' lors du montage du composant
  useEffect(() => {
    if (emailInputRef.current) {
      console.log("Référence du champ Email :", emailInputRef.current);
      emailInputRef.current.focus();
    }
  }, []);

  const [errors, setErrors] = useState({});
  const [userNotFound, setUserNotFound] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const validate = () => {
    const newErrors = {};

    if (!utilisateurDto.email) newErrors.email = "L'email est requis";
    if (!utilisateurDto.mot_de_passe) newErrors.mot_de_passe = "Le mot de passe est requis";

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
    console.log("handleSubmit appelé");

    // Validation des champs
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Requête pour vérifier l'existence de l'utilisateur
    fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: utilisateurDto.email,
        mot_de_passe: utilisateurDto.mot_de_passe,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          setUserNotFound(true);
          throw new Error("Utilisateur inconnu");
        }
        return response.json(); // ✅ Parse la réponse JSON ici
      })

      .then((data) => {
        console.log("data: " + JSON.stringify(data));
        if (data.userId && data.accessToken) {
          // document.cookie = `token=${data.accessToken}; path=/; secure; samesite=strict`;

          localStorage.setItem("token", data.accessToken);

          login(data.userRole, data.userType, data.accessToken);

          navigate("/");
        } else {
          setUserNotFound(true); // Afficher le message "Utilisateur inconnu"
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la soumission du formulaire!", error);
      });
  };

  return (
    <Wrapper>
      <div className="titre">Connexion</div>
      <div className="espace"></div>
      <form onSubmit={handleSubmit} className="form-container">
        {errors.email && <div className="message-erreur">{errors.email}</div>}
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

        {errors.mot_de_passe && <div className="message-erreur">{errors.mot_de_passe}</div>}
        <ChampSaisie
          setValue={(value) => handleChange("mot_de_passe", value)}
          label="Mot de passe :"
          name="mot_de_passe"
          value={utilisateurDto.mot_de_passe}
          regex={passwordRegex}
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

export default Connexion;
