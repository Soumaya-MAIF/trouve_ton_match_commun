import "./header.css";
import "./../../../index.css";
import { useAuth } from "../components/context/AuthContext";
import { Link } from "react-router";

const Header = () => {
  const { auth, logout, role, typeUtilisateur } = useAuth();

  console.log("auth = " + auth);

  return (
    <>
      <header className="header-desktop">
        <div className="header-container">
          <Link to="/">
            <div className="favicon-container">
              <div className="favicon" alt="favicon_TTM"></div>
            </div>
          </Link>
          {auth != null ? (
            <>
              <Link className="menu" to="/mon-compte">
                Mon compte
              </Link>
              {/* <Link className="menu" to="/profils">Profils disponibles</Link> */}
              <Link className="menu" to="/messages">
                Messages
              </Link>
              {typeUtilisateur === "PARRAIN" && (
                <Link className="menu" to="/matchs">
                  Mes porteurs
                </Link>
              )}
              {/* <Link className="menu" to="/ressources">Ressources</Link> */}
              {auth != null && role === "ADMINISTRATEUR" && (
                <>
                  <div className="bouton">
                    <Link to="/creation-compte">
                      <button type="button" className="btn-creer">
                        Créer un compte
                      </button>
                    </Link>
                  </div>
                  {/* <Link className="menu" to="/indicateurs">Indicateurs</Link> */}
                </>
              )}
              <Link to="/">
                <div className="bouton">
                  <button type="button" className="btn-connexion" onClick={logout}>
                    Se déconnecter
                  </button>
                </div>
              </Link>
            </>
          ) : (
            <Link to="/connexion">
              <div className="bouton">
                <button type="button" className="btn-connexion">
                  Se connecter
                </button>
              </div>
            </Link>
          )}
        </div>
        <div className="header-container">
          <div className="logo-ttm" alt="logo_TTM" />
          <div className="logo-reseau" alt="logo_reseau" />
        </div>
        <div className="line" />
      </header>
      <header className="header-mobile">
        <div className="header-container-mobile">
          <div className="colonne col-1">
            <Link to="/menu-burger">
              <div className="menu-burger" alt="menu-burger"></div>
            </Link>
          </div>
          <div className="colonne col-2">
            <div className="logo-reseau logo-mobile" alt="logo_reseau" />
            <div className="logo-ttm" alt="logo_TTM" />
          </div>
          <div className="colonne col-3">{auth != null && <div className="utlisateur" alt="logo_utlisateur" />}</div>
        </div>
        <div className="line" />
      </header>
    </>
  );
};

export default Header;
