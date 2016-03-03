package sk.mdzurik.auth;

import java.security.Principal;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author mdzurik
 */
@Path("/auth")
public class AuthResource {

    @POST
    @Path("/user")
    @Produces(MediaType.APPLICATION_JSON)
    public UserResponse getUser(@Context HttpServletRequest httpRequest) {
        UserResponse response = null;
        Principal principal = httpRequest.getUserPrincipal();
    
        if (principal != null) {
            response = new UserResponse();
            response.setLogin(principal.getName());

            Set<Role> roles = new HashSet<>();
            for (Role role : Role.values()) {
                if (httpRequest.isUserInRole(role.name())) {
                    roles.add(role);
                }
            }
            response.setRoles(roles);
        }
        return response;
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public LoginResponse login(@Context HttpServletRequest httpRequest, LoginRequest request) {
        LoginResponse response = new LoginResponse();

        if (httpRequest.getUserPrincipal() == null) {
            try {
                httpRequest.getSession().getId(); //GlassFish need session before login
                httpRequest.login(request.getUsername(), request.getPassword());
                response.setSuccess(true);
            } catch (ServletException ex) {
                response.setSuccess(false);
            }
        } else {
            response.setSuccess(false);
        }

        return response;
    }

    @POST
    @Path("/logout")
    public void logout(@Context HttpServletRequest httpRequest) {
        try {
            httpRequest.logout();
        } catch (ServletException ex) {
            Logger.getLogger(AuthResource.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
