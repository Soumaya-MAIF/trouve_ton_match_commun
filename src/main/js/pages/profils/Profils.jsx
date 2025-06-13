import Wrapper from "../../wrapper/Index";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
// import { useAuth } from '../../AuthContext';

import "./../../components/global.css";
import "./profils.css";
// import photoIdentite from '../../../medias/images/identite-faciale_vert.png';
import photoIdentite from "../../../medias/images/identite.png";
import pouceBlanc from "../../../medias/images/pouce_blanc_rose2.png";
import pouceRose from "../../../medias/images/pouce_rose.png";
import { CarteParrain } from "./CarteParrain";
import { CartePorteur } from "./CartePorteur";

const Profils = () => {
  // const parrainDispo = true
  // const match = ''

  // if (parrainDispo) {
  return (
    <Wrapper>
      <div className="titre">Profils disponibles</div>
      <div className="profil-row">
        <CarteParrain
          nom="DUPONT Laurent"
          entreprise="Tartempion"
          branches="Métiers de l'automobile"
          domaines="La comptabilté, le droit du travail, le marketing, la vente, les ressources humaines, la logistique, l'infrastructure informatique, ..."
          zone="Niort, et 50km autour"
          match={true}
        ></CarteParrain>
        <CarteParrain
          nom="LEGRAND Sophie"
          entreprise="Tech Solutions"
          branches="Technologie de l'information"
          domaines="Développement logiciel, gestion de projet, cybersécurité, infrastructure réseau"
          zone="Bressuire et alentours"
          match={false}
        />
        <CarteParrain
          nom="MARTIN Jean"
          entreprise="Green Energy"
          branches="Énergies renouvelables"
          domaines="Ingénierie, gestion de l'environnement, développement durable, gestion de projet"
          zone="Thouars, et 30km autour"
          match={false}
        />
        <CarteParrain
          nom="DURAND Claire"
          entreprise="Bâtir Ensemble"
          branches="Construction"
          domaines="Architecture, gestion de chantier, sécurité, urbanisme"
          zone="Niort, et 70km autour"
          match={false}
        />

        <CarteParrain
          nom="LEROY Paul"
          entreprise="AgriTech"
          branches="Agriculture"
          domaines="Agroécologie, gestion des cultures, innovation agricole, développement durable"
          zone="St Maixent l'école, et 20km autour"
          match={false}
        />
        <CarteParrain
          nom="ROBIN Marie"
          entreprise="Santé Plus"
          branches="Santé"
          domaines="Gestion hospitalière, soins infirmiers, administration de la santé, recherche médicale"
          zone="Secondigny, et 60km autour"
          match={false}
        />
      </div>
    </Wrapper>
  );
  // } else {
  //     return (
  //         <Wrapper>
  //             <div className='titre'>Profils disponibles</div>
  //             <div className='profil-row'>
  //                 <CartePorteur
  //                     nom="DURAND Alain"
  //                     entreprise="Trucmuche"
  //                     description="Maçonnerie"
  //                     besoins="La comptabilté, le droit du travail, ..."
  //                     lieu="Parthenay"
  //                     match={false}
  //                     >
  //                 </CartePorteur>
  //                 <CartePorteur
  //                     nom="LEFEBVRE Marie"
  //                     entreprise="Bricolo"
  //                     description="Électricité"
  //                     besoins="Marketing, vente, ressources humaines"
  //                     lieu="Melle"
  //                     match={true}
  //                 />
  //                 <CartePorteur
  //                     nom="MARTIN Pierre"
  //                     entreprise="Jardinier Pro"
  //                     description="Paysagisme"
  //                     besoins="Logistique, infrastructure informatique"
  //                     lieu="Echiré"
  //                     match={false}
  //                 />
  //                 <CartePorteur
  //                     nom="BERNARD Sophie"
  //                     entreprise="Cuisine Délice"
  //                     description="Restauration"
  //                     besoins="Comptabilité, droit du travail, marketing"
  //                     lieu="Coulon"
  //                     match={false}
  //                 />
  //                 <CartePorteur
  //                     nom="ROUSSEAU Jean"
  //                     entreprise="Tech Innov"
  //                     description="Développement logiciel"
  //                     besoins="Vente, ressources humaines, logistique"
  //                     lieu="Aiffres"
  //                     match={false}
  //                 />
  //                 <CartePorteur
  //                     nom="DUPUIS Claire"
  //                     entreprise="Nettoyage Plus"
  //                     description="Services de nettoyage"
  //                     besoins="Marketing, comptabilité, ressources humaines"
  //                     lieu="Niort"
  //                     match={false}
  //                 />
  //             </div>
  //         </Wrapper>
  //     )
  // }
};

export default Profils;
