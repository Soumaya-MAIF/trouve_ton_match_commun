import './header.css';
import './../../../index.css'
import { Link } from "react-router-dom";
import { useAuth } from '../components/context/AuthContext';


// let connecter = true;
let connecter = false;

// let admin = true;
let admin = false;


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
                    {auth != null ? 
                    (
                        <>
                        <Link className="menu" to="/mon-compte-parrain">Mon compte</Link>
                        {/* <Link className="menu" to="/profils">Profils disponibles</Link> */}
                        <Link className="menu" to="/messages">Messages</Link>
                        {typeUtilisateur === 'PARRAIN' && <Link className="menu" to="/matchs">Mes porteurs</Link>}
                        {/* <Link className="menu" to="/ressources">Ressources</Link> */}
                        </>
                    ) : 
                    (
                        <Link to="/connexion">
                            <button type="button" className="btn-connexion">Se connecter</button>
                        </Link>
                                            
                    )}                  

                    { (auth != null && role === "ADMINISTRATEUR") ? (
                        <>
                            <div className="bouton">
                                <Link to="/creation-compte">
                                    <button type="button" className="btn-creer">Créer un compte</button>
                                </Link>
                            </div>
                            {/* <Link className="menu" to="/indicateurs">Indicateurs</Link> */}
                        </>
                    ) : null }
                    <div className="bouton">
                    <button type="button" className="btn-connexion" onClick={logout}>Se déconnecter</button>
                    </div>
                </div>
                <div className="header-container">
                    <div className="logo-ttm" alt="logo_TTM" />
                    <div className="logo-reseau" alt="logo_reseau" />
                </div>
                <div class="line" />
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
                            {connecter ? (
                                <div className='utlisateur' alt='logo_utlisateur'/>
                            ) : null }
                    </div>
                </div>
                <div class="line" />

            </header>
        </>
    );
};

export default Header;