import Wrapper from '../../wrapper/Index';
import { useEffect, useState, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './../../components/global.css';
import { Link } from "react-router-dom";

let connecter = true;
// let connecter = false;

// let admin = true;
let admin = false;

const MenuBurger = () => {
    return (
        <Wrapper>
            { !connecter ? (
                <>
                    <Link className="menu-mobile" to="/connexion">Se connecter</Link>   
                </>
             ) : (
                 admin ? (
                     <>
                        <Link className="menu-mobile" to="/creation-compte">Créer un compte</Link>
                        {/* <Link className="menu-mobile" to="/ressources">Ressources</Link>
                        <Link className="menu-mobile" to="/indicateurs">Indicateurs</Link> */}
                    </>

                ) : (
                    <>
                        <Link className="menu-mobile" to="/mon-compte-parrain">Mon compte</Link>
                        {/* <Link className="menu-mobile" to="/profils">Profils disponibles</Link> */}
                        <Link className="menu-mobile" to="/messages-contact">Messages</Link>
                        <Link className="menu-mobile" to="/matchs">Mes Matchs</Link>
                        {/* <Link className="menu-mobile" to="/ressources">Ressources</Link> */}
                    </>
                )
            )}
        </Wrapper>

    )
}

export default MenuBurger;