package fm.nrjaudio.jegeremeswrs.data;

import java.sql.Timestamp;
import java.sql.Timestamp;


public class BrandParamsDB {

	private int id;
	private int id_country;
	private String name;
	private Boolean enabled;
	private Timestamp sys_created_date;
	private Timestamp sys_modified_date;
	private Long count;
	private String chemin_logo;
	private String color_brand;
	private String statuswr;
	
	public String getChemin_logo() {
		return chemin_logo;
	}
	public void setChemin_logo(String chemin_logo) {
		this.chemin_logo = chemin_logo;
	}
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
	public Boolean isEnabled() {
		return enabled;
	}
	public void setEnabled(Boolean enabled) {
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
	
	public Long getCount() {
		return count;
	}
	public void setCount(Long count) {
		this.count = count;
	}

	
	public String getColor_brand() {
		return color_brand;
	}
	public void setColor_brand(String color_brand) {
		this.color_brand = color_brand;
	}
	
	
	
	public String getStatuswr() {
		return statuswr;
	}
	public void setStatuswr(String statuswr) {
		this.statuswr = statuswr;
	}
	public BrandParamsDB(Brand brand,Long count, String chemin_logo, String color_brand,String statuswr) {
		super();
		this.id = brand.getId();
		this.id_country = brand.getId_country();
		this.name = brand.getName();
		this.enabled = brand.isEnabled();
		this.sys_created_date = brand.getSys_created_date();
		this.sys_modified_date = brand.getSys_modified_date();
		this.count=count;
		this.chemin_logo = chemin_logo;
		this.color_brand = color_brand;
		this.statuswr = statuswr;
	}
	
	
	public BrandParamsDB(Brand brand, String chemin_logo, String color_brand) {
		super();
		this.id = brand.getId();
		this.id_country = brand.getId_country();
		this.name = brand.getName();
		this.enabled = brand.isEnabled();
		this.sys_created_date = brand.getSys_created_date();
		this.sys_modified_date = brand.getSys_modified_date();
		this.chemin_logo = chemin_logo;
		this.color_brand = color_brand;
	}
	
	
	public BrandParamsDB(int id, int id_country, String name, Boolean enabled, Timestamp sys_created_date,
			Timestamp sys_modified_date, Long count, String chemin_logo, String color_brand) {
		super();
		this.id = id;
		this.id_country = id_country;
		this.name = name;
		this.enabled = enabled;
		this.sys_created_date = sys_created_date;
		this.sys_modified_date = sys_modified_date;
		this.count = count;
		this.chemin_logo = chemin_logo;
		this.color_brand = color_brand;
	}
	
	
	
	
	public BrandParamsDB(int id, int id_country, String name, Boolean enabled, Timestamp sys_created_date,
			Timestamp sys_modified_date, Long count, String chemin_logo, String color_brand, String statuswr) {
		super();
		this.id = id;
		this.id_country = id_country;
		this.name = name;
		this.enabled = enabled;
		this.sys_created_date = sys_created_date;
		this.sys_modified_date = sys_modified_date;
		this.count = count;
		this.chemin_logo = chemin_logo;
		this.color_brand = color_brand;
		this.statuswr = statuswr;
	}
	public BrandParamsDB() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	

}
