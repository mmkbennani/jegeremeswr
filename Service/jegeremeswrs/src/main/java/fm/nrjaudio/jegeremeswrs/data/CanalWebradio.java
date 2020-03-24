package fm.nrjaudio.jegeremeswrs.data;

import java.time.LocalDateTime;

public class CanalWebradio {

	private int id_canal;
	private int fk_country;
	private Integer id_wr;
	private LocalDateTime date_disponnible;
	
	private String nom_canal;
	private Boolean isSite=false;
	private Boolean isApplication=false;
	private Boolean isAgregatteur=false;
	private int id_pressplay;
	private String nom_webradio;

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

	public Integer getId_wr() {
		return id_wr;
	}

	public void setId_wr(Integer id_wr) {
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

	public Boolean getIsSite() {
		return isSite;
	}

	public void setIsSite(Boolean isSite) {
		this.isSite = isSite;
	}

	public Boolean getIsApplication() {
		return isApplication;
	}

	public void setIsApplication(Boolean isApplication) {
		this.isApplication = isApplication;
	}

	public Boolean getIsAgregatteur() {
		return isAgregatteur;
	}

	public void setIsAgregatteur(Boolean isAgregatteur) {
		this.isAgregatteur = isAgregatteur;
	}

	public int getId_pressplay() {
		return id_pressplay;
	}

	public void setId_pressplay(int id_pressplay) {
		this.id_pressplay = id_pressplay;
	}

	public String getNom_webradio() {
		return nom_webradio;
	}

	public void setNom_webradio(String nom_webradio) {
		this.nom_webradio = nom_webradio;
	}

	public CanalWebradio() {
		super();
	}

	public CanalWebradio(int id_canal, int fk_country, Integer id_wr, LocalDateTime date_disponnible, String nom_canal,
			Boolean isSite, Boolean isApplication, Boolean isAgregatteur, int id_pressplay, String nom_webradio) {
		super();
		this.id_canal = id_canal;
		this.fk_country = fk_country;
		this.id_wr = id_wr;
		this.date_disponnible = date_disponnible;
		this.nom_canal = nom_canal;
		this.isSite = isSite;
		this.isApplication = isApplication;
		this.isAgregatteur = isAgregatteur;
		this.id_pressplay = id_pressplay;
		this.nom_webradio = nom_webradio;
	}
	
	
	
	
}
