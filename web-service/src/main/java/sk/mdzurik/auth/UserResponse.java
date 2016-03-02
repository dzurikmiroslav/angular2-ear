package sk.mdzurik.auth;

import java.util.Set;

/**
 *
 * @author mdzurik
 */
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
