package fm.nrjaudio.jegeremeswrs.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tb_webradio_placement", schema="bobwr")
public class WebradioPlacement {
	
	@Id
	@SequenceGenerator(allocationSize=1, name = "MySeqWebradioPlacement", sequenceName = "bobwr.SeqWebradioPlacement", initialValue = 5)
    @GeneratedValue(generator = "MySeqWebradioPlacement")
	private int pk;
	private int id_webradio;
	private int avantapres;
	private Integer id_webradio_avantapres;
	private int id_genre_application;
	private String url_logo;
	
	
	
	public int getPk() {
		return pk;
	}
	public void setPk(int pk) {
		this.pk = pk;
	}
	public int getId_webradio() {
		return id_webradio;
	}
	public void setId_webradio(int id_webradio) {
		this.id_webradio = id_webradio;
	}
	public int getAvantapres() {
		return avantapres;
	}
	public void setAvantapres(int avantapres) {
		this.avantapres = avantapres;
	}
	public Integer getId_webradio_avantapres() {
		return id_webradio_avantapres;
	}
	public void setId_webradio_avantapres(Integer id_webradio_avantapres) {
		this.id_webradio_avantapres = id_webradio_avantapres;
	}
	
	
	
	public String getUrl_logo() {
		return url_logo;
	}
	public void setUrl_logo(String url_logo) {
		this.url_logo = url_logo;
	}
	public int getId_genre_application() {
		return id_genre_application;
	}
	public void setId_genre_application(int id_genre_application) {
		this.id_genre_application = id_genre_application;
	}
	public WebradioPlacement(int pk, int id_webradio, int avantapres, Integer id_webradio_avantapres) {
		super();
		this.pk = pk;
		this.id_webradio = id_webradio;
		this.avantapres = avantapres;
		this.id_webradio_avantapres = id_webradio_avantapres;
	}
	
	
	
	
	public WebradioPlacement(int pk, int id_webradio, int avantapres, Integer id_webradio_avantapres,
			int id_genre_application, String url_logo) {
		super();
		this.pk = pk;
		this.id_webradio = id_webradio;
		this.avantapres = avantapres;
		this.id_webradio_avantapres = id_webradio_avantapres;
		this.id_genre_application = id_genre_application;
		this.url_logo = url_logo;
	}
	public WebradioPlacement() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	

}
