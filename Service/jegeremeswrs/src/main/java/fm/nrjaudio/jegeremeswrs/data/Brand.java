package fm.nrjaudio.jegeremeswrs.data;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "brand", schema="control")
public class Brand {
	@Id
    @GeneratedValue
	private int id;
	private int id_country;
	private String name;
	private boolean enabled;
	private Timestamp sys_created_date;
	private Timestamp sys_modified_date;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getId_country() {
		return id_country;
	}
	public void setId_country(int id_country) {
		this.id_country = id_country;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	public Brand(int id, int id_country, String name, boolean enabled, Timestamp sys_created_date,
			Timestamp sys_modified_date) {
		super();
		this.id = id;
		this.id_country = id_country;
		this.name = name;
		this.enabled = enabled;
		this.sys_created_date = sys_created_date;
		this.sys_modified_date = sys_modified_date;
	}
	public Brand() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	

}
