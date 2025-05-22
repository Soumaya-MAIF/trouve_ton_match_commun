import './header.css';
import './../../../index.css'
import { Link } from "react-router";
import { useAuth } from '../AuthContext';

// let connecter = true;
// let connecter = false;

// let admin = true;
// let admin = false;


const Header = () => {
    const { isAuthenticated, isAdmin, logout } = useAuth();  // Récupérer les états et fonctions du contexte
    console.log('Header rendu avec isAuthenticated:', isAuthenticated, 'isAdmin:', isAdmin); // Log pour vérifier les états

    return (
        <>
            <header className="header-desktop">
                <div className="header-container">
                    <Link to="/">
                        <div className="favicon-container">
                            <div className="favicon" alt="favicon_TTM"></div>
                        </div>
                    </Link>
                    {(isAuthenticated && !isAdmin) ? (
                        <Link className="menu" to="/mon-compte">Mon compte</Link>
                    ) : null}
                    {(isAuthenticated && !isAdmin) ? (
                        <Link className="menu" to="/profils">Profils disponibles</Link>
                    ) : null}
                    {(isAuthenticated && !isAdmin) ? (
                        <Link className="menu" to="/messages">Messages</Link>
                    ) : null}
                    {(isAuthenticated && !isAdmin) ? (
                        <Link className="menu" to="/matchs">Mes Matchs</Link>
                    ) : null}
                    {isAuthenticated ? (
                        <Link className="menu" to="/ressources">Ressources</Link>
                    ) : null}
                    {(isAuthenticated && isAdmin) ? (
                        <Link className="menu" to="/indicateurs">Indicateurs</Link>
                    ) : null}
                    {!isAuthenticated ? (
                        <>
                            <div className="bouton">
                                <Link to="/connexion">
                                    <button type="button" className="btn-connexion">Se connecter</button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="bouton">
                                <Link to="/">
                                    <button type="button" className="btn" onClick={logout}>Se déconnecter</button>
                                </Link>
                            </div>
                        </>
                    )}
                    {(isAuthenticated && isAdmin) ? (
                        <>
                            <div className="bouton">
                                <Link to="/creation-compte">
                                    <button type="button" className="btn-creer">Créer un compte</button>
                                </Link>
                            </div>
                        </>
                    ) : null}
                </div>
                <div className="header-container">
                    <div className="logo-ttm" alt="logo_TTM" />
                    <div className="logo-reseau" alt="logo_reseau" />
                </div>
                <div className="line" />
            </header>
            <header className='header-mobile'>
                <div className="header-container-mobile">
                    <div className='colonne col-1'>
                        <Link to="/menu-burger">
                            <div className="menu-burger" alt="menu-burger"></div>
                        </Link>
                    </div>
                    <div className='colonne col-2'>
                        <div className="logo-reseau logo-mobile" alt="logo_reseau" />
                        <div className="logo-ttm" alt="logo_TTM" />
                    </div>
                    <div className='colonne col-3'>
                        {isAuthenticated  ? (
                            <div className='utilisateur' alt='logo_utlisateur' />
                        ) : null}
                    </div>
                </div>
                <div className="line" />

            </header>
        </>
    );
};

export default Header;