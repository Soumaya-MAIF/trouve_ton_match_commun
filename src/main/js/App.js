import { Routes, Route } from 'react-router-dom';
import Accueil from './pages/accueil/Accueil';
import MonCompteParrain from './pages/mon-compte-parrain/MonCompteParrain';
import MonComptePorteur from './pages/mon-compte-porteur/MonComptePorteur';
import Profils from './pages/profils/Profils';
import Matchs from './pages/matchs/Matchs';
import Messages from './pages/messages/Messages';
import Ressources from './pages/ressources/Ressources';
import Indicateurs from './pages/indicateurs/Indicateurs';
import Connexion from './pages/connexion/Connexion';
import CreationCompte from './pages/creation-compte/CreationCompte';
import Filtres from './pages/filtres/Filtres';
// import { AuthProvider } from './AuthContext';

function App() {
  return (
    // <AuthProvider>
      <Routes>
        <Route path='/' element={<Accueil/>}></Route>
        <Route path='/mon-compte-parrain' element={<MonCompteParrain/>}></Route>
        <Route path='/mon-compte-porteur' element={<MonComptePorteur/>}></Route>
        <Route path='/profils' element={<Profils/>}></Route>
        <Route path='/matchs' element={<Matchs/>}></Route>
        <Route path='/messages' element={<Messages/>}></Route>
        <Route path='/ressources' element={<Ressources/>}></Route>
        <Route path='/indicateurs' element={<Indicateurs/>}></Route>
        <Route path='/connexion' element={<Connexion/>}></Route>
        <Route path='/creation-compte' element={<CreationCompte/>}></Route>
        <Route path='/filtres' element={<Filtres/>}></Route>
      </Routes>
    // </AuthProvider>
  );
}

export default App;
