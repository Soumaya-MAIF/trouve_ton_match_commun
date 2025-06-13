import Wrapper from "../../wrapper/Index";

import "./../../components/global.css";
import { Link } from "react-router";
import { useAuth } from "../../components/context/AuthContext";

const MenuBurger = () => {
  const { isAuthenticated, isAdmin } = useAuth(); // Récupérer les états et fonctions du contexte

  return (
    <Wrapper>
      {!isAuthenticated ? (
        <>
          <Link className="menu-mobile" to="/connexion">
            Se connecter
          </Link>
        </>
      ) : isAdmin ? (
        <>
          <Link className="menu-mobile" to="/creation-compte">
            Créer un compte
          </Link>
          {/* <Link className="menu-mobile" to="/ressources">Ressources</Link>
                        <Link className="menu-mobile" to="/indicateurs">Indicateurs</Link> */}
        </>
      ) : (
        <>
          <Link className="menu-mobile" to="/mon-compte-parrain">
            Mon compte
          </Link>
          {/* <Link className="menu-mobile" to="/profils">Profils disponibles</Link> */}
          <Link className="menu-mobile" to="/messages-contact">
            Messages
          </Link>
          <Link className="menu-mobile" to="/matchs">
            Mes porteurs
          </Link>
          {/* <Link className="menu-mobile" to="/ressources">Ressources</Link> */}
        </>
      )}
    </Wrapper>
  );
};

export default MenuBurger;
