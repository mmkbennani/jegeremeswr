package fm.nrjaudio.jegeremeswrs.data;

import java.time.LocalDateTime;

public class WebradioExcel {
	
	
	
	private String nom_wr;
	private int id_pressplay;
	private LocalDateTime date_creation_request;
	private LocalDateTime date_deletion_request;
	private String genre_application;
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
	public String getGenre_application() {
		return genre_application;
	}
	public void setGenre_application(String genre_application) {
		this.genre_application = genre_application;
	}
	public WebradioExcel(String nom_wr, int id_pressplay, LocalDateTime date_creation_request,
			LocalDateTime date_deletion_request, String genre_application) {
		super();
		this.nom_wr = nom_wr;
		this.id_pressplay = id_pressplay;
		this.date_creation_request = date_creation_request;
		this.date_deletion_request = date_deletion_request;
		this.genre_application = genre_application;
	}
	public WebradioExcel() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
