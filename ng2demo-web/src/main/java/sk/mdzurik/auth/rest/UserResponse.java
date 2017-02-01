package sk.mdzurik.auth.rest;

import java.util.Set;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author mdzurik
 */
@XmlRootElement()
@XmlAccessorType(XmlAccessType.FIELD)
public class UserResponse {

    private String login;

    private Set<Role> roles;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        return "User{" + "login=" + login + ", roles=" + roles + '}';
    }
    
}
