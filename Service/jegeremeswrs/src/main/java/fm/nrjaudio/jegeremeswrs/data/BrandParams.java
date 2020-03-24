package fm.nrjaudio.jegeremeswrs.data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "brand_params", schema="bobwr")
public class BrandParams {
	
	@Id
	private int pk;
	private int id_radio;
	private String chemin_logo;
	private String color_brand;
	public int getPk() {
		return pk;
	}
	public void setPk(int pk) {
		this.pk = pk;
	}
	public int getId_radio() {
		return id_radio;
	}
	public void setId_radio(int id_radio) {
		this.id_radio = id_radio;
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
	public BrandParams(int pk, int id_radio, String chemin_logo, String color_brand) {
		super();
		this.pk = pk;
		this.id_radio = id_radio;
		this.chemin_logo = chemin_logo;
		this.color_brand = color_brand;
	}
	public BrandParams() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}
