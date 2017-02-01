package sk.mdzurik.service;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;

/**
 *
 * @author mdzurik
 */
@LocalBean
@Stateless
public class StuffService {

    public String getSomeStuff() {
        return "The some stuff is here...";
    }

}
