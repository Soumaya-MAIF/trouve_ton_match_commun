import Wrapper from "../../wrapper/Index";

import "./../../components/global.css";
import "./profils.css";
import { CartePorteur } from "./CartePorteur";

const Matchs = () => {
  const match = "";

  return (
    <Wrapper>
      <div className="titre">Les porteurs de projet que je soutiens</div>
      <div className="profil-row">
        <CartePorteur
          nom="MARTIN Alain"
          entreprise="Garage MARTIN"
          présentation="Projet : création d'un garage automobiles sur le commune de Mougon."
          match={false}
        ></CartePorteur>
        <CartePorteur
          nom="GUERIN Claude"
          entreprise="EpannesElec"
          présentation="Je souhaite créer mon entreprise d'électricité générale sur la commune d'Epannes."
          match={true}
        />
        <CartePorteur
          nom="DURAND Pierre"
          entreprise="Jardinier Pro"
          présentation="Je souhaite créer ma société d'entretien des jardins de particuliers"
          match={false}
        />
        <CartePorteur
          nom="PERRAULT Sophie"
          entreprise="Cuisine Délice"
          présentation="Je veux ouvrir un restaurant gastronomique dans le marais poitevin "
          match={false}
        />
        <CartePorteur nom="ROUSSEAU Jean" entreprise="Tech Innov" présentation="Développement logiciel" match={false} />
        <CartePorteur nom="DUPUIS Claire" entreprise="Nettoyage Plus" présentation="Services de nettoyage" match={false} />
      </div>
    </Wrapper>
  );
};

export default Matchs;
