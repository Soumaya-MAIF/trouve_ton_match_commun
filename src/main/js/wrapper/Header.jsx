import './header.css';
import { Link } from "react-router-dom";
// import { useAuth } from '../AuthContext';

const Header = () => {
    // const { isAuthenticated, logout } = useAuth();

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-row">
                    <div className="header-col">
                        <Link to="/">
                            <div className="favicon-container">
                                <div className="favicon" alt="favicon_TTM"></div>
                            </div>
                        </Link>
                    </div>
                    <div className="header-col">
                        <Link className="menu" to="/monCompteParrain">Mon compte</Link>
                    </div>
                    <div className="header-col">
                        <Link className="menu" to="/profils">Profils disponibles</Link>
                    </div>
                    <div className="header-col">
                        <Link className="menu" to="/messages">Messages</Link>
                    </div>
                    <div className="header-col">
                        <Link className="menu" to="/matchs">Mes Matchs</Link>
                    </div>
                    <div className="header-col">
                        <Link className="menu" to="/ressources">Ressources</Link>
                    </div>
                    <div className="header-col">
                        <Link className="menu" to="/indicateurs">Indicateurs</Link>
                    </div>
                    <div className="header-col">
                        <div className="bouton">
                        {/* <button type="button" className="btn" onClick={logout}>Se déconnecter</button> */}
                        <Link to="/connexion">
                            <button type="button" className="btn-connexion">Se connecter</button>
                        </Link>
                            {/* {isAuthenticated ? (
                                <button type="button" className="btn" onClick={logout}>Se déconnecter</button>
                            ) : (
                                <Link to="/connexion">
                                    <button type="button" className="btn">Se connecter</button>
                                </Link>
                            )} */}
                        </div>
                    </div>
                    <div className="header-col">
                        <div className="bouton">
                            <Link to="/creationCompte">
                                <button type="button" className="btn-creer">Créer un compte</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="header-row">
                    <div className="header-col">
                        <div className="logo-ttm" alt="logo_TTM" />
                    </div>
                    <div className="header-col">
                        <div className="logo-reseau" alt="logo_reseau" />
                    </div>
                </div>
                <div class="line" />
            </div>
        </header>
    );
};

export default Header;