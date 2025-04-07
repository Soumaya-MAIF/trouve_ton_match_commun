//package back.trouve_ton_match.service;
//
//
//import back.trouve_ton_match.entity.SecteurReseau;
//import back.trouve_ton_match.repository.SecteursReseauxRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.bind.annotation.PathVariable;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class SecteursReseauxService {
//
//    @Autowired
//    private SecteursReseauxRepository repository;
//
//
//
//    public Optional<SecteurReseau> getSecteursReseauxById(@PathVariable Long id) {
//        return repository.findById(id);
//    }
//
//    public SecteurReseau createSecteursReseaux(SecteurReseau secteurReseau) {
//        return repository.save(secteurReseau);
//    }
//
//    public List<SecteurReseau> getSecteursReseaux() {
//        return repository.findAll();
//
//    }
//}
