package fm.nrjaudio.jegeremeswrs.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.springframework.web.multipart.MultipartFile;


public class WebradioPlacementFile {
	
	private WebradioPlacement webradioPlacement;
	private MultipartFile logo_webradio;
	public WebradioPlacement getWebradioPlacement() {
		return webradioPlacement;
	}
	public void setWebradioPlacement(WebradioPlacement webradioPlacement) {
		this.webradioPlacement = webradioPlacement;
	}
	public MultipartFile getLogo_webradio() {
		return logo_webradio;
	}
	public void setLogo_webradio(MultipartFile logo_webradio) {
		this.logo_webradio = logo_webradio;
	}
	public WebradioPlacementFile() {
		super();
		// TODO Auto-generated constructor stub
	}
	public WebradioPlacementFile(WebradioPlacement webradioPlacement, MultipartFile logo_webradio) {
		super();
		this.webradioPlacement = webradioPlacement;
		this.logo_webradio = logo_webradio;
	}

	
	

}
