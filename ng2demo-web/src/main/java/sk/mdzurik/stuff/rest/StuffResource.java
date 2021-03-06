package sk.mdzurik.stuff.rest;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import sk.mdzurik.service.StuffService;

/**
 *
 * @author mdzurik
 */
@Stateless
@Path("/stuff")
public class StuffResource {

    @EJB
    private StuffService stuffService;

    @GET
    @Path("/")
    @Produces(MediaType.TEXT_PLAIN)
    public String getText() {
        return stuffService.getSomeStuff();
    }

}
