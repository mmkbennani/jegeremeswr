package fm.nrjaudio.jegeremeswrs.data;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tb_webradio_highlited", schema="bobwr")
public class WebradioHighlited {
	
	@Id
	@SequenceGenerator(allocationSize=1, name = "MySeqWebradioHighlited", sequenceName = "bobwr.MySeqWebradioHighlited", initialValue = 5)
    @GeneratedValue(generator = "MySeqWebradioHighlited")
	private int pk;
	private int country;
	private int brand;
	private int id_webradio_highlighted_1;
	private int id_webradio_highlighted_2;
	private int id_webradio_highlighted_3;
	private int id_webradio_highlighted_4;
	private LocalDateTime date_action_request;
	private LocalDateTime sys_modified_datet;
	
	public WebradioHighlited() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getPk() {
		return pk;
	}

	public void setPk(int pk) {
		this.pk = pk;
	}

	public int getCountry() {
		return country;
	}

	public void setCountry(int country) {
		this.country = country;
	}

	public int getBrand() {
		return brand;
	}

	public void setBrand(int brand) {
		this.brand = brand;
	}

	public int getId_webradio_highlighted_1() {
		return id_webradio_highlighted_1;
	}

	public void setId_webradio_highlighted_1(int id_webradio_highlighted_1) {
		this.id_webradio_highlighted_1 = id_webradio_highlighted_1;
	}

	public int getId_webradio_highlighted_2() {
		return id_webradio_highlighted_2;
	}

	public void setId_webradio_highlighted_2(int id_webradio_highlighted_2) {
		this.id_webradio_highlighted_2 = id_webradio_highlighted_2;
	}

	public int getId_webradio_highlighted_3() {
		return id_webradio_highlighted_3;
	}

	public void setId_webradio_highlighted_3(int id_webradio_highlighted_3) {
		this.id_webradio_highlighted_3 = id_webradio_highlighted_3;
	}

	public int getId_webradio_highlighted_4() {
		return id_webradio_highlighted_4;
	}

	public void setId_webradio_highlighted_4(int id_webradio_highlighted_4) {
		this.id_webradio_highlighted_4 = id_webradio_highlighted_4;
	}

	public LocalDateTime getDate_action_request() {
		return date_action_request;
	}

	public void setDate_action_request(LocalDateTime date_action_request) {
		this.date_action_request = date_action_request;
	}

	public LocalDateTime getSys_modified_datet() {
		return sys_modified_datet;
	}

	public void setSys_modified_datet(LocalDateTime sys_modified_datet) {
		this.sys_modified_datet = sys_modified_datet;
	}

	public WebradioHighlited(int pk, int country, int brand, int id_webradio_highlighted_1,
			int id_webradio_highlighted_2, int id_webradio_highlighted_3, int id_webradio_highlighted_4,
			LocalDateTime date_action_request, LocalDateTime sys_modified_datet) {
		super();
		this.pk = pk;
		this.country = country;
		this.brand = brand;
		this.id_webradio_highlighted_1 = id_webradio_highlighted_1;
		this.id_webradio_highlighted_2 = id_webradio_highlighted_2;
		this.id_webradio_highlighted_3 = id_webradio_highlighted_3;
		this.id_webradio_highlighted_4 = id_webradio_highlighted_4;
		this.date_action_request = date_action_request;
		this.sys_modified_datet = sys_modified_datet;
	}

	
	
	

}
