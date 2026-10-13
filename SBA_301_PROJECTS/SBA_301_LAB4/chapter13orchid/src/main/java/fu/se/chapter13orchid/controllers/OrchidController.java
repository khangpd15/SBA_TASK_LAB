package fu.se.chapter13orchid.controllers;

import fu.se.chapter13orchid.pojos.Orchid;
import fu.se.chapter13orchid.services.IOrchidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/orchids")
public class OrchidController {

    @Autowired
    private IOrchidService iOrchidService;

    // HTTP Verb GET, POST, PUT, DELETE
    @GetMapping({"/", ""})
    public ResponseEntity<List<Orchid>> fetchAll() {
        return ResponseEntity.ok(iOrchidService.getAllOrchids());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Orchid>> get0ById(@PathVariable int id) {
        Optional<Orchid> o = iOrchidService.getOrchidByID(id);
        return ResponseEntity.ok(o);
    }

    @PostMapping({"/", ""})
    @ResponseStatus(HttpStatus.CREATED)
    public Orchid saveOrchid(@RequestBody Orchid orchid) {
        return iOrchidService.insertOrchid(orchid);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orchid> updateOrchid(@PathVariable int id, @RequestBody Orchid o) {
        Orchid updateOrchid = iOrchidService.updateOrchid(id, o);
        return ResponseEntity.ok(updateOrchid);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrchid(@PathVariable int id) {
        iOrchidService.deleteOrchid(id);
        return ResponseEntity.ok("Deleted!!");
    }
}
