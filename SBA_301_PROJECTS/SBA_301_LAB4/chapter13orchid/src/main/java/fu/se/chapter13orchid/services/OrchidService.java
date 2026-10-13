package fu.se.chapter13orchid.services;

import fu.se.chapter13orchid.pojos.Orchid;
import fu.se.chapter13orchid.repositories.IOrchidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrchidService implements IOrchidService {

    @Autowired
    private IOrchidRepository iOrchidRepository;

    @Override
    public List<Orchid> getAllOrchids() {
        return iOrchidRepository.findAll();
    }

    @Override
    public Orchid insertOrchid(Orchid orchid) {
        return iOrchidRepository.save(orchid);
    }

    @Override
    public Orchid updateOrchid(int orchidID, Orchid orchid) {
        Optional<Orchid> optionalOrchid = iOrchidRepository.findById(orchidID);
        if (optionalOrchid.isPresent()) {
            Orchid o = optionalOrchid.get();
            o.setOrchidName(orchid.getOrchidName());
            o.setOrchidDescription(orchid.getOrchidDescription());
            o.setNatural(orchid.isNatural());
            o.setOrchidCategory(orchid.getOrchidCategory());
            o.setAttractive(orchid.isAttractive());
            o.setOrchidURL(orchid.getOrchidURL());
            return iOrchidRepository.save(o);
        }
        return null;
    }

    @Override
    public void deleteOrchid(int orchid) {
        iOrchidRepository.deleteById(orchid);
    }

    @Override
    public Optional<Orchid> getOrchidByID(int orchidID) {
        return iOrchidRepository.findById(orchidID);
    }
}
