package fm.nrjaudio.jegeremeswrs.data;

import java.sql.Timestamp;
import java.util.ArrayList;


public class ArrayBrandParamsDB {

	private int id;
	private int id_country;
	private String name;
	private Boolean enabled;
	private Timestamp sys_created_date;
	private Timestamp sys_modified_date;
	ArrayList<CountBrand> countBrand;
	private String chemin_logo;
	private String color_brand;
	
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
	
	public ArrayList<CountBrand> getCountBrand() {
		return countBrand;
	}
	public void setCountBrand(ArrayList<CountBrand> countBrand) {
		this.countBrand = countBrand;
	}
	public Boolean getEnabled() {
		return enabled;
	}
	
	
	
	
	public String getChemin_logo() {
		return chemin_logo;
	}
	public void setChemin_logo(String chemin_logo) {
		this.chemin_logo = chemin_logo;
	}
	public String getColor_brand() {
		return color_brand;
	}
	public void setColor_brand(String color_brand) {
		this.color_brand = color_brand;
	}
	
	
	
	
	
	public ArrayBrandParamsDB(int id, int id_country, String name, Boolean enabled, Timestamp sys_created_date,
			Timestamp sys_modified_date, ArrayList<CountBrand> countBrand, String chemin_logo, String color_brand) {
		super();
		this.id = id;
		this.id_country = id_country;
		this.name = name;
		this.enabled = enabled;
		this.sys_created_date = sys_created_date;
		this.sys_modified_date = sys_modified_date;
		this.countBrand = countBrand;
		this.chemin_logo = chemin_logo;
		this.color_brand = color_brand;
	}
	public ArrayBrandParamsDB() {
		super();
		// TODO Auto-generated constructor stub
	}

}


