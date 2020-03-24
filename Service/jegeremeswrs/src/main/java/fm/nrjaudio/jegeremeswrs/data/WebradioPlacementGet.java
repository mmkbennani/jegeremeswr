package fm.nrjaudio.jegeremeswrs.data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


public class WebradioPlacementGet {
	
	private int pk;
	private int id_wr;
	private String nom_wr;
	private int id_pressplay;
	private String claim;
	private boolean pub;
	//private String claim_couleur;
	private String logo_emplacement;
	
	private int id_radio;
	private int id_country;
	
	private int id_orange_genre;
	private int id_itunes_genre;
	private int id_orange_ssgenre;
	
	private LocalDateTime date_creation_request;
	private LocalDateTime date_deletion_request;
	private LocalDateTime sys_created_date;
	private LocalDateTime sys_modified_date;
	
	
	private String createdBy;
	
	
	ArrayList<WebradioPlacement> wrPlacement;
	

	public int getPk() {
		return pk;
	}

	public void setPk(int pk) {
		this.pk = pk;
	}

	public int getId_wr() {
		return id_wr;
	}

	public void setId_wr(int id_wr) {
		this.id_wr = id_wr;
	}

	public String getNom_wr() {
		return nom_wr;
	}

	public void setNom_wr(String nom_wr) {
		this.nom_wr = nom_wr;
	}

	public int getId_pressplay() {
		return id_pressplay;
	}

	public void setId_pressplay(int id_pressplay) {
		this.id_pressplay = id_pressplay;
	}

	public String getClaim() {
		return claim;
	}

	public void setClaim(String claim) {
		this.claim = claim;
	}

	public boolean isPub() {
		return pub;
	}

	public void setPub(boolean pub) {
		this.pub = pub;
	}

	

	public int getId_orange_genre() {
		return id_orange_genre;
	}

	public void setId_orange_genre(int id_orange_genre) {
		this.id_orange_genre = id_orange_genre;
	}

	public int getId_itunes_genre() {
		return id_itunes_genre;
	}

	public void setId_itunes_genre(int id_itunes_genre) {
		this.id_itunes_genre = id_itunes_genre;
	}

	public int getId_orange_ssgenre() {
		return id_orange_ssgenre;
	}

	public void setId_orange_ssgenre(int id_orange_ssgenre) {
		this.id_orange_ssgenre = id_orange_ssgenre;
	}

	public String getLogo_emplacement() {
		return logo_emplacement;
	}

	public void setLogo_emplacement(String logo_emplacement) {
		this.logo_emplacement = logo_emplacement;
	}

	public int getId_radio() {
		return id_radio;
	}

	public void setId_radio(int id_radio) {
		this.id_radio = id_radio;
	}

	public int getId_country() {
		return id_country;
	}

	public void setId_country(int id_country) {
		this.id_country = id_country;
	}

	

	public LocalDateTime getDate_creation_request() {
		return date_creation_request;
	}

	public void setDate_creation_request(LocalDateTime date_creation_request) {
		this.date_creation_request = date_creation_request;
	}

	public LocalDateTime getDate_deletion_request() {
		return date_deletion_request;
	}

	public void setDate_deletion_request(LocalDateTime date_deletion_request) {
		this.date_deletion_request = date_deletion_request;
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

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	

	

	public ArrayList<WebradioPlacement> getWrPlacement() {
		return wrPlacement;
	}

	public void setWrPlacement(ArrayList<WebradioPlacement> wrPlacement) {
		this.wrPlacement = wrPlacement;
	}


	
	

	public WebradioPlacementGet(int pk, int id_wr, String nom_wr, int id_pressplay, String claim, boolean pub,
			String logo_emplacement, int id_radio, int id_country, int id_orange_genre, int id_itunes_genre,
			int id_orange_ssgenre, LocalDateTime date_creation_request, LocalDateTime date_deletion_request, LocalDateTime sys_created_date,
			LocalDateTime sys_modified_date, String createdBy, ArrayList<WebradioPlacement> wrPlacement) {
		super();
		this.pk = pk;
		this.id_wr = id_wr;
		this.nom_wr = nom_wr;
		this.id_pressplay = id_pressplay;
		this.claim = claim;
		this.pub = pub;
		this.logo_emplacement = logo_emplacement;
		this.id_radio = id_radio;
		this.id_country = id_country;
		this.id_orange_genre = id_orange_genre;
		this.id_itunes_genre = id_itunes_genre;
		this.id_orange_ssgenre = id_orange_ssgenre;
		this.date_creation_request = date_creation_request;
		this.date_deletion_request = date_deletion_request;
		this.sys_created_date = sys_created_date;
		this.sys_modified_date = sys_modified_date;
		this.createdBy = createdBy;
		this.wrPlacement = wrPlacement;
	}
	
	
	public WebradioPlacementGet(Webradio wr, ArrayList<WebradioPlacement> wrPlacement) {
		super();
		this.pk = wr.getPk();
		this.id_wr = wr.getId_wr();
		this.nom_wr = wr.getNom_wr();
		this.id_pressplay = wr.getId_pressplay();
		this.claim = wr.getClaim();
		this.pub = wr.isPub();
		this.logo_emplacement = wr.getLogo_emplacement();
		this.id_radio = wr.getId_radio();
		this.id_country = wr.getId_country();
		this.id_orange_genre = wr.getId_orange_genre();
		this.id_itunes_genre = wr.getId_itunes_genre();
		this.id_orange_ssgenre = wr.getId_orange_ssgenre();
		this.date_creation_request = wr.getDate_creation_request();
		this.date_deletion_request = wr.getDate_deletion_request();
		this.sys_created_date = wr.getSys_created_date();
		this.sys_modified_date = wr.getSys_modified_date();
		this.createdBy = wr.getCreatedBy();
		this.wrPlacement = wrPlacement;
	}

	public WebradioPlacementGet() {
		super();
		// TODO Auto-generated constructor stub
	}
}
