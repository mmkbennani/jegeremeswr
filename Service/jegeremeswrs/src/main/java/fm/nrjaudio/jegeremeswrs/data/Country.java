package fm.nrjaudio.jegeremeswrs.data;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "country", schema="control")
public class Country {

	@Id
    @GeneratedValue
	private int id;
	private String name;
	private String iso_name;
	private boolean enabled;
	private Timestamp sys_created_date;
	private Timestamp sys_modified_date;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getIso_name() {
		return iso_name;
	}
	public void setIso_name(String iso_name) {
		this.iso_name = iso_name;
	}
	public boolean isEnabled() {
		return enabled;
	}
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	public Timestamp getSys_created_date() {
		return sys_created_date;
	}
	public void setSys_created_date(Timestamp sys_created_date) {
		this.sys_created_date = sys_created_date;
	}
	public Timestamp getSys_modified_date() {
		return sys_modified_date;
	}
	public void setSys_modified_date(Timestamp sys_modified_date) {
		this.sys_modified_date = sys_modified_date;
	}
	public Country(int id, String name, String iso_name, boolean enabled, Timestamp sys_created_date,
			Timestamp sys_modified_date) {
		super();
		this.id = id;
		this.name = name;
		this.iso_name = iso_name;
		this.enabled = enabled;
		this.sys_created_date = sys_created_date;
		this.sys_modified_date = sys_modified_date;
	}
	public Country() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	
	
	
}
