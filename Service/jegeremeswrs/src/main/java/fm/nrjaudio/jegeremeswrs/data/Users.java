package fm.nrjaudio.jegeremeswrs.data;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "users", schema="users")
public class Users {

	@Id
    @GeneratedValue
	private int id;
	private String login;
	private String password;
	private String firstname;
	private String lastname;
	private Boolean is_admin;
	private Boolean enabled;
	private Boolean is_connected;
	private LocalDateTime last_connection;
	private LocalDateTime sys_created_date;
	private LocalDateTime sys_modified_date;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public Boolean getIs_admin() {
		return is_admin;
	}
	public void setIs_admin(Boolean is_admin) {
		this.is_admin = is_admin;
	}
	public Boolean getEnabled() {
		return enabled;
	}
	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}
	public Boolean getIs_connected() {
		return is_connected;
	}
	public void setIs_connected(Boolean is_connected) {
		this.is_connected = is_connected;
	}
	public LocalDateTime getLast_connection() {
		return last_connection;
	}
	public void setLast_connection(LocalDateTime last_connection) {
		this.last_connection = last_connection;
	}
	public LocalDateTime getSys_created_date() {
		return sys_created_date;
	}
	public void setSys_created_date(LocalDateTime sys_created_date) {
		this.sys_created_date = sys_created_date;
	}
	public LocalDateTime getSys_modified_date() {
		return sys_modified_date;
	}
	public void setSys_modified_date(LocalDateTime sys_modified_date) {
		this.sys_modified_date = sys_modified_date;
	}
	public Users(int id, String login, String password, String firstname, String lastname, Boolean is_admin,
			Boolean enabled, Boolean is_connected, LocalDateTime last_connection, LocalDateTime sys_created_date,
			LocalDateTime sys_modified_date) {
		super();
		this.id = id;
		this.login = login;
		this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
		this.is_admin = is_admin;
		this.enabled = enabled;
		this.is_connected = is_connected;
		this.last_connection = last_connection;
		this.sys_created_date = sys_created_date;
		this.sys_modified_date = sys_modified_date;
	}
	public Users() {
		super();
		// TODO Auto-generated constructor stub
	}
}
