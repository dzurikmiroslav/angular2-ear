package sk.mdzurik.rest;

import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author mdzurik
 */
@Stateless
@Path("/stuff")
public class StuffResource {

//TODO fix
//    @EJB
//    private StuffService stuffService;
    @GET
    @Path("/")
    @Produces(MediaType.TEXT_PLAIN)
    public String getText() {
        return "The some stuff is here...";
//        return stuffService.getSomeStuff();
    }

}
