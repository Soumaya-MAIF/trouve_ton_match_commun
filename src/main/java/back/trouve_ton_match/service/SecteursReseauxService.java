package back.trouve_ton_match.service;


import back.trouve_ton_match.entity.SecteursReseaux;
import back.trouve_ton_match.repository.SecteursReseauxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class SecteursReseauxService {

    @Autowired
    private SecteursReseauxRepository repository;



    public Optional<SecteursReseaux> getSecteursReseauxById(@PathVariable Long id) {
        return repository.findById(id);
    }

    public SecteursReseaux createSecteursReseaux(SecteursReseaux secteursReseaux) {
        return repository.save(secteursReseaux);
    }

    public List<SecteursReseaux> getSecteursReseaux() {
        return repository.findAll();

    }
}
