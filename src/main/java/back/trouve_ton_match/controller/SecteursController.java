package back.trouve_ton_match.controller;

import back.trouve_ton_match.entity.SecteursReseaux;
import back.trouve_ton_match.service.SecteursReseauxService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping( value="/secteurs_reseaux", produces = MediaType.APPLICATION_JSON_VALUE)
public class SecteursController {

    @Autowired
    private SecteursReseauxService service;

    @GetMapping("/{id}")
    public SecteursReseaux getSecteursReseauxById(@PathVariable Long id) {
        return service.getSecteursReseauxById(id).orElse(null);
    }


    @GetMapping("")
    public List<SecteursReseaux> getAll() {
        List<SecteursReseaux> secteurs = service.getSecteursReseaux();
        System.out.println("Secteur trouvé : " + secteurs);
        return secteurs;
    }
}
