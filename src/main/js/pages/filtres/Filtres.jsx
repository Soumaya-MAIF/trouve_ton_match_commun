import Wrapper from '../../wrapper/Index';
import { useEffect, useState, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../AuthContext';


import { ChampSaisie } from './../../components/champ-saisie/ChampSaisie.jsx';
import './filtres.css';
import './../mon-compte-porteur/mon-compte.css'
import './../../components/global.css'

const Filtres = () => {
    return (
        <Wrapper>
            <form className='filtre-container'>
                <div className='secteurs'>
                    <div className='titre'>Secteurs d'activité</div>
                    <label className="checkbox-label">
                        Activités de services administratifs et de soutien
                        <input
                            type="checkbox"
                            name="secteur1"
                            // checked={secteurReseau.secteur1}
                            // onChange={handleChange}
                        />
                    </label> 
                    <label className="checkbox-label">
                        Activités spécialisées, scientifiques et techniques
                        <input
                            type="checkbox"
                            name="secteur2"
                            // checked={secteurReseau.secteur2}
                            // onChange={handleChange}
                        />
                    </label>
                    <label className="checkbox-label">
                        Agriculture, sylviculture, pêche
                        <input
                            type="checkbox"
                            name="secteur3"
                            // checked={secteurReseau.secteur3}
                            // onChange={handleChange}
                        />
                    </label>
                    <label className="checkbox-label">
                        Arts, spectacles et activités récréatives
                        <input
                            type="checkbox"
                            name="secteur4"
                            // checked={secteurReseau.secteur4}
                            // onChange={handleChange}
                        />
                    </label>
                    <label className="checkbox-label">
                        Commerce et réparation
                        <input
                            type="checkbox"
                            name="secteur5"
                            // checked={secteurReseau.secteur5}
                            // onChange={handleChange}
                        />
                    </label>
                    <label className="checkbox-label">
                        Construction-BTP
                        <input
                            type="checkbox"
                            name="secteur6"
                            // checked={secteurReseau.secteur6}
                            // onChange={handleChange}
                        />
                    </label>
                    <label className="checkbox-label">
                        Enseignement
                        <input
                            type="checkbox"
                            name="secteur7"
                            // checked={secteurReseau.secteur6}
                            // onChange={handleChange}
                        />
                    </label>
                    <label className="checkbox-label">
                        Hôtels, cafés et restaurants
                        <input
                            type="checkbox"
                            name="secteur8"
                            // checked={secteurReseau.secteur6}
                            // onChange={handleChange}
                        />
                    </label>
                    <label className="checkbox-label">
                        Industrie
                        <input
                            type="checkbox"
                            name="secteur9"
                            // checked={secteurReseau.secteur6}
                            // onChange={handleChange}
                        />
                    </label>
                    <label className="checkbox-label">
                        Information et communication
                        <input
                            type="checkbox"
                            name="secteur10"
                            // checked={secteurReseau.secteur6}
                            // onChange={handleChange}
                        />
                    </label>
                    <label className="checkbox-label">
                        Production et distribution d’eau, assainissement, gestion des déchets et dépollution
                        <input
                            type="checkbox"
                            name="secteur11"
                            // checked={secteurReseau.secteur6}
                            // onChange={handleChange}
                        />
                    </label>
                    <label className="checkbox-label">
                        Production et distribution d’électricité, de gaz, de vapeur d’air conditionné
                        <input
                            type="checkbox"
                            name="secteur12"
                            // checked={secteurReseau.secteur6}
                            // onChange={handleChange}
                        />
                    </label>
                    <label className="checkbox-label">
                        Santé humaine et action sociale
                        <input
                            type="checkbox"
                            name="secteur13"
                            // checked={secteurReseau.secteur6}
                            // onChange={handleChange}
                        />
                    </label>
                    <label className="checkbox-label">
                        Services aux entreprises
                        <input
                            type="checkbox"
                            name="secteur14"
                            // checked={secteurReseau.secteur6}
                            // onChange={handleChange}
                        />
                    </label>
                    <label className="checkbox-label">
                        Services aux particuliers
                        <input
                            type="checkbox"
                            name="secteur15"
                            // checked={secteurReseau.secteur6}
                            // onChange={handleChange}
                        />
                    </label>
                    <label className="checkbox-label">
                        Transports
                        <input
                            type="checkbox"
                            name="secteur16"
                            // checked={secteurReseau.secteur6}
                            // onChange={handleChange}
                        />
                    </label>
                    <br />   

                </div>
                <div className='type-accompagnements'>
                    <div className='titre'>Type d'accompagnement</div>

                    <label className="checkbox-label">
                        Ressources humaines
                        <input
                            type="checkbox"
                            name="typeAccompagnement1"
                            // checked={accompagnements.typeAccompagnement1}
                            // onChange={handleChange}
                        />
                        </label><br/>
                        <label className="checkbox-label">
                            Finance / Comptabilité
                            <input
                                type="checkbox"
                                name="typeAccompagnement2"
                                // checked={accompagnements.typeAccompagnement2}
                                // onChange={handleChange}
                            />
                        </label><br />
                        <label className="checkbox-label">
                        Juridique
                        <input
                            type="checkbox"
                            name="typeAccompagnement3"
                            // checked={accompagnements.typeAccompagnement3}
                            // onChange={handleChange}
                        />
                        </label><br />
                        <label className="checkbox-label">
                        Informatique
                        <input
                            type="checkbox"
                            name="typeAccompagnement4"
                            // checked={accompagnements.typeAccompagnement4}
                            // onChange={handleChange}
                        />
                        </label><br />
                        <label className="checkbox-label">
                        Commercial / Communication
                        <input
                            type="checkbox"
                            name="typeAccompagnement5"
                            // checked={accompagnements.typeAccompagnement5}
                            // onChange={handleChange}
                        />
                    </label><br />
                </div>

            </form>
            <div className='btn-filtre'>
                <div className="btn">
                    <button type="submit" className='btn-enregistrer'>
                        Enregistrer
                    </button>
                </div>
            </div>


        </Wrapper>
    )
}

export default Filtres;