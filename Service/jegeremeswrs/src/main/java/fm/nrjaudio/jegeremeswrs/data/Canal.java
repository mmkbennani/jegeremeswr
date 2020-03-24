package fm.nrjaudio.jegeremeswrs.data;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tb_canal", schema="bobwr")
public class Canal {
	
	@Id
	@SequenceGenerator(allocationSize=1, name = "MySeqCanal", sequenceName = "bobwr.SeqCanal", initialValue = 5)
    @GeneratedValue(generator = "MySeqCanal")
	private int id_canal;
	private int fk_country;
	private Integer id_wr;
	private LocalDateTime date_disponnible;
	
	private String nom_canal;
	private Boolean isSite=false;
	private Boolean isApplication=false;
	private Boolean isAgregatteur=false;
	
	public int getId_canal() {
		return id_canal;
	}
	public void setId_canal(int id_canal) {
		this.id_canal = id_canal;
	}
	public int getFk_country() {
		return fk_country;
	}
	public void setFk_country(int fk_country) {
		this.fk_country = fk_country;
	}
	public int getId_wr() {
		return id_wr;
	}
	public void setId_wr(int id_wr) {
		this.id_wr = id_wr;
	}
	public LocalDateTime getDate_disponnible() {
		return date_disponnible;
	}
	public void setDate_disponnible(LocalDateTime date_disponnible) {
		this.date_disponnible = date_disponnible;
	}
	public String getNom_canal() {
		return nom_canal;
	}
	public void setNom_canal(String nom_canal) {
		this.nom_canal = nom_canal;
	}
	public boolean isSite() {
		return isSite;
	}
	public void setSite(boolean isSite) {
		this.isSite = isSite;
	}
	public boolean isApplication() {
		return isApplication;
	}
	public void setApplication(boolean isApplication) {
		this.isApplication = isApplication;
	}
	public boolean isAgregatteur() {
		return isAgregatteur;
	}
	public void setAgregatteur(boolean isAgregatteur) {
		this.isAgregatteur = isAgregatteur;
	}
	public Canal(int id_canal, int fk_country, int id_wr, LocalDateTime date_disponnible, String nom_canal, boolean isSite,
			boolean isApplication, boolean isAgregatteur) {
		super();
		this.id_canal = id_canal;
		this.fk_country = fk_country;
		this.id_wr = id_wr;
		this.date_disponnible = date_disponnible;
		this.nom_canal = nom_canal;
		this.isSite = isSite;
		this.isApplication = isApplication;
		this.isAgregatteur = isAgregatteur;
	}
	public Canal(int fk_country, int id_wr, LocalDateTime date_disponnible, String nom_canal, boolean isSite,
			boolean isApplication, boolean isAgregatteur) {
		super();
		this.fk_country = fk_country;
		this.id_wr = id_wr;
		this.date_disponnible = date_disponnible;
		this.nom_canal = nom_canal;
		this.isSite = isSite;
		this.isApplication = isApplication;
		this.isAgregatteur = isAgregatteur;
	}
	public Canal() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	

}
