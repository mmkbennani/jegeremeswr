package fm.nrjaudio.jegeremeswrs.data;

import java.time.LocalDateTime;

public class CanalWebradioInsUpd {

	private Canal canal;
	private int id_pressplay;
	private String nom_webradio;
	private int fk_country; 
	private int id_wr; 
	private LocalDateTime date_disponnible;
	
	
	public Canal getCanal() {
		return canal;
	}

	public void setCanal(Canal canal) {
		this.canal = canal;
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

	public CanalWebradioInsUpd() {
		super();
	}

	public CanalWebradioInsUpd(Canal canal, int id_pressplay, String nom_webradio, int fk_country, int id_wr,
			LocalDateTime date_disponnible) {
		super();
		this.canal = canal;
		this.id_pressplay = id_pressplay;
		this.nom_webradio = nom_webradio;
		this.fk_country = fk_country;
		this.id_wr = id_wr;
		this.date_disponnible = date_disponnible;
	}
	
	
	
	
}
