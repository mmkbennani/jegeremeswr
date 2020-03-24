package fm.nrjaudio.jegeremeswrs.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tb_genre_application", schema="bobwr")
public class GenreApplication {
	
	@Id
    @GeneratedValue
	private int pk;
	private int id_brand;
	private int id_country;
	private String genre_name;
	private String color;
	public int getPk() {
		return pk;
	}
	public void setPk(int pk) {
		this.pk = pk;
	}
	public int getId_brand() {
		return id_brand;
	}
	public void setId_brand(int id_brand) {
		this.id_brand = id_brand;
	}
	public String getGenre_name() {
		return genre_name;
	}
	public void setGenre_name(String genre_name) {
		this.genre_name = genre_name;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	
	public int getId_country() {
		return id_country;
	}
	public void setId_country(int id_country) {
		this.id_country = id_country;
	}
	public GenreApplication() {
		super();
		// TODO Auto-generated constructor stub
	}
	public GenreApplication(int pk, int id_brand, int id_country, String genre_name, String color) {
		super();
		this.pk = pk;
		this.id_brand = id_brand;
		this.id_country = id_country;
		this.genre_name = genre_name;
		this.color = color;
	}
	
	
	
	
	
	

}
