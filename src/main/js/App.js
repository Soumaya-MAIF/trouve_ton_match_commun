import { Routes, Route } from "react-router";
import Accueil from "./pages/accueil/Accueil";
// import MonCompteParrain from './pages/mon-compte-parrain/MonCompteParrain';
import MonCompte from "./pages/mon-compte/MonCompte";
import Profils from "./pages/profils/Profils";
import Matchs from "./pages/matchs/Matchs";
import Messages from "./pages/messages/Messages";
import MessagesContacts from "./pages/messages/MessagesContacts";
import Ressources from "./pages/ressources/Ressources";
import Indicateurs from "./pages/indicateurs/Indicateurs";
import Connexion from "./pages/connexion/Connexion";
import CreationCompte from "./pages/creation-compte/CreationCompte";
import Filtres from "./pages/filtres/Filtres";
import MenuBurger from "./pages/menu-burger/MenuBurger";
import { useEffect, useState } from "react";
import PremiereConnexion from "./pages/connexion/PremiereConnexion";
import MotDePasseChangement from "./pages/connexion/MotDePasseChangement";
import { AuthProvider } from "./components/context/components/context/AuthContext";
import { UserProvider } from "./components/context/UserContext";
import { ContactProvider } from "./components/context/ContactContext";

function App() {
  let [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AuthProvider>
      <UserProvider>
        <ContactProvider>
          <Routes>
            <Route path="/" element={<Accueil />}></Route>
            <Route path="/menu-burger" element={<MenuBurger />}></Route>
            {/* <Route path="/mon-compte-parrain" element={<MonCompteParrain />}></Route>
            <Route path="/mon-compte-porteur" element={<MonComptePorteur />}></Route> */}
            <Route path="/profils" element={<Profils />}></Route>
            <Route path="/matchs" element={<Matchs />}></Route>
            <Route path="/messages-contact" element={<MessagesContacts />}></Route>
            <Route path="/messages" element={<Messages />}></Route>
            <Route path="/mon-compte" element={<MonCompte />}></Route>
            {/* <Route path='/messages' element={<Messages isMobile={isMobile} />}></Route>  */}
            {/* { isMobile ? (
            <Route path='/messages' element={<MessagesContacts />}></Route> 
          ) : (
            <Route path='/messages' element={<Messages isMobile={isMobile} />}></Route> 
          ) } */}
            <Route path="/messages-contacts" element={<MessagesContacts />}></Route>
            <Route path="/ressources" element={<Ressources />}></Route>
            <Route path="/indicateurs" element={<Indicateurs />}></Route>
            <Route path="/connexion" element={<Connexion />}></Route>
            <Route path="/creation-compte" element={<CreationCompte />}></Route>
            <Route path="/filtres" element={<Filtres />}></Route>
            <Route path="/premiere-connexion" element={<PremiereConnexion />}></Route>
            <Route path="/mot-de-passe" element={<MotDePasseChangement />}></Route>
          </Routes>
        </ContactProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
