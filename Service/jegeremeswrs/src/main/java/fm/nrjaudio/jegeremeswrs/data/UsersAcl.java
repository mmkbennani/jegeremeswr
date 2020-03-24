package fm.nrjaudio.jegeremeswrs.data;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users_acl", schema="users")
public class UsersAcl {

	@Id
    @GeneratedValue
	private int id;
	private int id_user;
	private String acl;
	private LocalDateTime sys_created_date;
	private LocalDateTime sys_modified_date;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getId_user() {
		return id_user;
	}
	public void setId_user(int id_user) {
		this.id_user = id_user;
	}
	public String getAcl() {
		return acl;
	}
	public void setAcl(String acl) {
		this.acl = acl;
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
	public UsersAcl(int id, int id_user, String acl, LocalDateTime sys_created_date, LocalDateTime sys_modified_date) {
		super();
		this.id = id;
		this.id_user = id_user;
		this.acl = acl;
		this.sys_created_date = sys_created_date;
		this.sys_modified_date = sys_modified_date;
	}
	public UsersAcl() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	
	
	
	
}
