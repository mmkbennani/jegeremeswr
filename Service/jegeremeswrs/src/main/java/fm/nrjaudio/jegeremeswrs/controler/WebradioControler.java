package fm.nrjaudio.jegeremeswrs.controler;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.sun.xml.bind.v2.runtime.unmarshaller.XsiNilLoader.Array;

import fm.nrjaudio.jegeremeswrs.data.Canal;
import fm.nrjaudio.jegeremeswrs.data.GenreApplication;
import fm.nrjaudio.jegeremeswrs.data.Webradio;
import fm.nrjaudio.jegeremeswrs.data.WebradioCount;
import fm.nrjaudio.jegeremeswrs.data.WebradioExcel;
import fm.nrjaudio.jegeremeswrs.data.WebradioPlacement;
import fm.nrjaudio.jegeremeswrs.data.WebradioPlacementFile;
import fm.nrjaudio.jegeremeswrs.email.EmailService;
import fm.nrjaudio.jegeremeswrs.service.CanalService;
import fm.nrjaudio.jegeremeswrs.service.GenreApplicationService;
import fm.nrjaudio.jegeremeswrs.service.WebradioPlacementService;
import fm.nrjaudio.jegeremeswrs.service.WebradioService;
import net.minidev.json.JSONObject;


@Controller
public class WebradioControler {

	@Autowired
	WebradioService webradioService;
	@Autowired
	WebradioPlacementService webradioPlacementService;
	@Autowired
	private CanalService canalService;
	@Autowired
	private GenreApplicationService genreApplicationService;
	@Autowired
    private EmailService emailService;
	
	
	@Value("${uploaded_folder}")
	private String UPLOADED_FOLDER;
	
	@Value("${logo_folder}")
	private String LOGO_FOLDER;
	
	
	
	////// GET
	@GetMapping("/get_all_webradios/{id_country}")
    @ResponseBody
	public ResponseEntity<Object> getAllWebradios (@PathVariable Integer id_country){
		HttpHeaders responseHeaders = new HttpHeaders();
	    
		
		return ResponseEntity.ok()
			      .headers(responseHeaders)
			      .body(webradioService.getAllById_country(id_country));
	}
	
	
	
	@GetMapping("/get_all_webradios/{id_country}/{id_radio}")
    @ResponseBody
	public ResponseEntity<Object> getAllWebradiosByIdRadio (@PathVariable Integer id_country,@PathVariable Integer id_radio){
		HttpHeaders responseHeaders = new HttpHeaders();
	    
		
	    LocalDateTime localdatetimenow = LocalDateTime.now();
		return ResponseEntity.ok()
			      .headers(responseHeaders)
			      .body(webradioService.getAllById_countryandId_radio(id_country, id_radio,localdatetimenow));
	}
	

	@GetMapping("/get_all_webradios_inactive/{id_country}/{id_radio}")
    @ResponseBody
	public ResponseEntity<Object> getAllWebradiosByIdRadioInactive (@PathVariable Integer id_country,@PathVariable Integer id_radio){
		HttpHeaders responseHeaders = new HttpHeaders();
	    
		
	    LocalDateTime localdatetimenow = LocalDateTime.now();
		return ResponseEntity.ok()
			      .headers(responseHeaders)
			      .body(webradioService.getAllById_countryandId_radioInactive(id_country, id_radio,localdatetimenow));
	}
	
	
	
	@GetMapping("/get_all_webradios_sanspub/{id_country}/{id_radio}")
    @ResponseBody
	public ResponseEntity<Object> getAllWebradiosByIdRadioSanspub (@PathVariable Integer id_country,@PathVariable Integer id_radio){
		HttpHeaders responseHeaders = new HttpHeaders();
	    
		
	    LocalDateTime localdatetimenow = LocalDateTime.now();
		return ResponseEntity.ok()
			      .headers(responseHeaders)
			      .body(webradioService.getAllById_countryandId_radioSanspub(id_country, id_radio,localdatetimenow));
	}
	
	
	
	@GetMapping("/get_all_webradios_prochainement/{id_country}/{id_radio}")
    @ResponseBody
	public ResponseEntity<Object> getAllWebradiosByIdRadioProchainement (@PathVariable Integer id_country,@PathVariable Integer id_radio){
		HttpHeaders responseHeaders = new HttpHeaders();
	    
		
	    LocalDateTime localdatetimenow = LocalDateTime.now();
		return ResponseEntity.ok()
			      .headers(responseHeaders)
			      .body(webradioService.getAllById_countryandId_radioProchainement(id_country, id_radio,localdatetimenow));
	}
	
	@GetMapping("/get_all_webradios_inactive_sanspub/{id_country}/{id_radio}")
	@ResponseBody
	public ResponseEntity<Object> getAllWebradiosByIdRadioInactiveSanspub (@PathVariable Integer id_country,@PathVariable Integer id_radio){
		HttpHeaders responseHeaders = new HttpHeaders();
		
		
		LocalDateTime localdatetimenow = LocalDateTime.now();
		return ResponseEntity.ok()
				  .headers(responseHeaders)
				  .body(webradioService.getAllById_countryandId_radioInactiveSanspub(id_country, id_radio,localdatetimenow));
	}



	@GetMapping("/get_all_webradios_sanspub_prochainement/{id_country}/{id_radio}")
	@ResponseBody
	public ResponseEntity<Object> getAllWebradiosByIdRadioSanspubProchainement (@PathVariable Integer id_country,@PathVariable Integer id_radio){
		HttpHeaders responseHeaders = new HttpHeaders();
		
		
		LocalDateTime localdatetimenow = LocalDateTime.now();
		return ResponseEntity.ok()
				  .headers(responseHeaders)
				  .body(webradioService.getAllById_countryandId_radioSanspubProchainement(id_country, id_radio,localdatetimenow));
	}
	
	
	@GetMapping("/get_all_webradios_by_id_pressplay/{id_country}/{id_radio}/{id_pressplay}")
	@ResponseBody
	public ResponseEntity<Object> getAllWebradiosByIdPressplay (@PathVariable Integer id_country,@PathVariable Integer id_radio,@PathVariable Integer id_pressplay){
		HttpHeaders responseHeaders = new HttpHeaders();
		return ResponseEntity.ok()
				  .headers(responseHeaders)
				  .body(webradioService.getWebradioByIdPressplay(id_country, id_radio,id_pressplay));
	}
	
	
	@GetMapping("/get_septpremieresupp/{id_country}")
	@ResponseBody
	public ResponseEntity<Object> getSeptpremieresupp (@PathVariable Integer id_country){
		HttpHeaders responseHeaders = new HttpHeaders();
		
		
		LocalDateTime localdatetimenow = LocalDateTime.now();
		return ResponseEntity.ok()
				  .headers(responseHeaders)
				  .body(webradioService.getSeptpremieresupp(id_country,localdatetimenow));
	}
	
	
	@GetMapping("/get_septpremiereprochainement/{id_country}")
	@ResponseBody
	public ResponseEntity<Object> getSeptpremiereprochainement (@PathVariable Integer id_country){
		HttpHeaders responseHeaders = new HttpHeaders();
		
		
		LocalDateTime localdatetimenow = LocalDateTime.now();
		return ResponseEntity.ok()
				  .headers(responseHeaders)
				  .body(webradioService.getSeptpremiereprochainement(id_country,localdatetimenow));
	}
	
	
	
	
	
	@GetMapping("/webradio/{id_wr}")//rajout de country
    @ResponseBody
	public ResponseEntity<Optional<Webradio>> getWebradioByIdAdded (@PathVariable Integer id_wr){
		
		HttpHeaders responseHeaders = new HttpHeaders();
	    
		
		return ResponseEntity.ok()
			      .headers(responseHeaders)
			      .body(webradioService.findById(id_wr));
	}
	//getWebradioExcelByDatePrecise
	
	
	
	
	
	
	@GetMapping("/countwradio/{id_country}")
    @ResponseBody
	public ResponseEntity<Object> getWebradioByRadio (@PathVariable Integer id_country){		
		HttpHeaders responseHeaders = new HttpHeaders();
	    
	    return ResponseEntity.ok()
			      .headers(responseHeaders)
			      .body(webradioService.getCountByRadio(id_country));
	}
	
	
	
	@GetMapping("/get_all_webradios_by_genre/{id_country}/{id_radio}/{id_application_genre}")
    @ResponseBody
	public ResponseEntity<Object> getAllWebradiosByIdRadioByIdGenre (@PathVariable Integer id_country,@PathVariable Integer id_radio,@PathVariable Integer id_application_genre){
		HttpHeaders responseHeaders = new HttpHeaders();
	    
	    
	    LocalDateTime localdatetimenow = LocalDateTime.now();
	    ArrayList<Webradio> ArAllWebradioByGenre = new ArrayList<Webradio>();
	    ArrayList<Webradio> ArAllWebradio =  webradioService.getAllById_countryandId_radioByGenre(id_country, id_radio,localdatetimenow);
	    
	    for(Webradio wr : ArAllWebradio) {
	    	ArrayList<WebradioPlacement> genreWr = webradioPlacementService.getAllWebradioPlacementByIdWr(wr.getPk());
	    	for(WebradioPlacement genreWrUn : genreWr) {
	    		if(genreWrUn.getId_genre_application()==id_application_genre) {
	    			ArAllWebradioByGenre.add(wr);
	    		}
	    	}
	    	
	    }
	    
	    
		return ResponseEntity.ok()
			      .headers(responseHeaders)
			      .body(ArAllWebradioByGenre);
	}
	

	
	
	////////////// EXCEL //////////////////////
	
	
	@GetMapping("/get_webradio_by_date_precise/{id_country}/{id_radio}/{date_precise}")
    @ResponseBody
	public List<WebradioExcel> webradioByDatePrecise (@PathVariable Integer id_country,@PathVariable Integer id_radio,@PathVariable String date_precise){
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime date_dispoconvert = LocalDateTime.parse(date_precise, formatter) ;
		List<WebradioExcel> listeWeradioExcel = new ArrayList<WebradioExcel>();
		ArrayList<Webradio> arrayWebradioByDate = webradioService.getWebradioExcelByDatePrecise(id_country, id_radio, date_dispoconvert);
		
		for(Webradio webradio : arrayWebradioByDate) {
			WebradioExcel webradioExcel = new WebradioExcel();
			
			webradioExcel.setNom_wr(webradio.getNom_wr());
			webradioExcel.setId_pressplay(webradio.getId_pressplay());
			webradioExcel.setDate_creation_request(webradio.getDate_creation_request());
			webradioExcel.setDate_deletion_request(webradio.getDate_deletion_request());
			
			if(webradio.getWrPlacement() != null && webradio.getWrPlacement().size() != 0) {
				String webradioStr= "";
				
				for(int i = 0; i<webradio.getWrPlacement().size()-1; i++) {
					ArrayList<GenreApplication> genreApplication = genreApplicationService.getAllByIdGenreApplication(webradio.getWrPlacement().get(i).getId_genre_application());
					webradioStr += genreApplication.get(0).getGenre_name();
					webradioStr += ", ";
				}
				
				ArrayList<GenreApplication> genreApplication = genreApplicationService.getAllByIdGenreApplication(webradio.getWrPlacement().get(webradio.getWrPlacement().size()-1).getId_genre_application());
				webradioStr += genreApplication.get(0).getGenre_name();
				webradioExcel.setGenre_application(webradioStr);
			}
			listeWeradioExcel.add(webradioExcel);
			//genreApplicationService.getAllByIdGenreApplication(id_genre_application)
		}
		
		
		return listeWeradioExcel;
	}
	
	
	@GetMapping("/get_webradio_by_date_range/{id_country}/{id_radio}/{date_debut}/{date_fin}")
    @ResponseBody
	public List<WebradioExcel> webradioByDateRange (@PathVariable Integer id_country,@PathVariable Integer id_radio,@PathVariable String date_debut,@PathVariable String date_fin){
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime date_local_debut = LocalDateTime.parse(date_debut, formatter) ;
		LocalDateTime date_local_fin = LocalDateTime.parse(date_fin, formatter) ;
		List<WebradioExcel> listeWeradioExcel = new ArrayList<WebradioExcel>();
		ArrayList<Webradio> arrayWebradioByDate = webradioService.getWebradioExcelByDateRange(id_country, id_radio, date_local_debut,date_local_fin);
		
		for(Webradio webradio : arrayWebradioByDate) {
			WebradioExcel webradioExcel = new WebradioExcel();
			
			webradioExcel.setNom_wr(webradio.getNom_wr());
			webradioExcel.setId_pressplay(webradio.getId_pressplay());
			webradioExcel.setDate_creation_request(webradio.getDate_creation_request());
			webradioExcel.setDate_deletion_request(webradio.getDate_deletion_request());
			
			if(webradio.getWrPlacement() != null && webradio.getWrPlacement().size() != 0) {
				String webradioStr= "";
				
				for(int i = 0; i<webradio.getWrPlacement().size()-1; i++) {
					ArrayList<GenreApplication> genreApplication = genreApplicationService.getAllByIdGenreApplication(webradio.getWrPlacement().get(i).getId_genre_application());
					webradioStr += genreApplication.get(0).getGenre_name();
					webradioStr += ", ";
				}
				
				ArrayList<GenreApplication> genreApplication = genreApplicationService.getAllByIdGenreApplication(webradio.getWrPlacement().get(webradio.getWrPlacement().size()-1).getId_genre_application());
				webradioStr += genreApplication.get(0).getGenre_name();
				webradioExcel.setGenre_application(webradioStr);
			}
			listeWeradioExcel.add(webradioExcel);
			//genreApplicationService.getAllByIdGenreApplication(id_genre_application)
		}
		
		
		return listeWeradioExcel;
	}
	
	
	
	
	
	
	
	
	
	/// POST/////////////

	
	@PostMapping("/webradio")
	public ResponseEntity<Object> createWebradio(@RequestBody Webradio webradio) throws IOException {
		HttpHeaders responseHeaders = new HttpHeaders();
	    
		int id_country = webradio.getId_country();

		Webradio initialWebradio = null;
		String initialWebradioNomWebradio = null;
		boolean iSid_pressplay = false;
		boolean iSnom_wr = false;
		boolean iSclaim = false;
		boolean iSpub = false;
		boolean iSid_orange_genre = false;
		boolean iSid_itunes_genre = false;
		boolean iSid_orange_ssgenre = false;
		boolean iSPlacement = false;
		boolean isDateDebut = false; 
		boolean isDateFin = false;

		Webradio getChanges = null;
		Integer intwebradio = new Integer(webradio.getPk());
		if(webradio.getPk() != 0) {
			getChanges = webradioService.findById(webradio.getPk()).get() ;
			initialWebradioNomWebradio = getChanges.getNom_wr().toString();
			if(!getChanges.getClaim().equals(webradio.getClaim())) {
				iSclaim = true;
			}
			if(getChanges.getId_pressplay() != webradio.getId_pressplay()) {
				iSid_pressplay = true;
			}
			if(!getChanges.getNom_wr().equals(webradio.getNom_wr())) {
				iSnom_wr = true;
			}
			if(getChanges.isPub() != webradio.isPub()) {
				iSpub = true;
			}
			if(getChanges.getId_orange_genre() != webradio.getId_orange_genre()) {
				iSid_orange_genre = true;
			}
			if(getChanges.getId_orange_ssgenre() != webradio.getId_orange_ssgenre()) {
				iSid_orange_ssgenre = true;
			}
			if(getChanges.getId_itunes_genre() != webradio.getId_itunes_genre()) {
				iSid_itunes_genre = true;
			}
			if(!getChanges.getDate_creation_request().isEqual(webradio.getDate_creation_request())) {
				isDateDebut = true;
			}
			if(getChanges.getDate_deletion_request() != null && webradio.getDate_deletion_request() !=  null && getChanges.getDate_deletion_request() != webradio.getDate_deletion_request()) {
				isDateFin = true;
			}
			if(getChanges.getDate_deletion_request() != null && webradio.getDate_deletion_request() ==  null) {
				isDateFin = true;
			}
			if(getChanges.getDate_deletion_request() == null && webradio.getDate_deletion_request() !=  null) {
				isDateFin = true;
			}
		}
		
		LocalDateTime localdatetimenowInit = LocalDateTime.now();
		initialWebradio = new Webradio(intwebradio, -1, initialWebradioNomWebradio, -1, "", false, "", -1, -1, -1, -1, -1, localdatetimenowInit, localdatetimenowInit, localdatetimenowInit, localdatetimenowInit, "", "");
		Webradio savedWebradio = webradioService.save(webradio);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedWebradio.getPk()).toUri();

		List<Canal> listCanalAffecte = canalService.findCanalByNumAndCountry(id_country, savedWebradio.getPk());
		if(listCanalAffecte!= null && listCanalAffecte.size()!= 0) {
			Canal canaldispo = new Canal();
			canaldispo = listCanalAffecte.get(0);
			canaldispo.setDate_disponnible(savedWebradio.getDate_deletion_request());
			canalService.save(canaldispo);
		}else {
			
			List<Canal> listCanaux = canalService.findPremierCanauxDispo(id_country);
			Canal canaldispo = new Canal();
			LocalDateTime localdatetimenow = LocalDateTime.now();//webradio.getSys_created_date()<
			LocalDateTime datecreated_date = webradio.getSys_created_date();

			if(listCanaux != null && listCanaux.size() != 0 && (intwebradio == 0 
					|| (localdatetimenow.isAfter(datecreated_date)))) {
				canaldispo =  listCanaux.get(0);
				canaldispo.setId_wr(savedWebradio.getPk());
				canaldispo.setDate_disponnible(savedWebradio.getDate_deletion_request());
				canalService.save(canaldispo);
			}else {
				return ResponseEntity.badRequest().headers(responseHeaders).body(webradio);
			}
			
			
		}
	
		
		

		
		
		List<WebradioPlacement> wrPlacementWr = webradioPlacementService.getAllWebradioPlacementByIdWr(savedWebradio.getPk());
		
		
		if(wrPlacementWr != null && wrPlacementWr.size() != 0) {
			
			for(int i = 0; i<wrPlacementWr.size(); i++) {
				boolean isHere = false;
				for(WebradioPlacement unwrPlacement : webradio.getWrPlacement()) {
					if(unwrPlacement.getId_genre_application()==wrPlacementWr.get(i).getId_genre_application()) {
						isHere=true;
						
						WebradioPlacement savedPlacement = new WebradioPlacement();
						savedPlacement.setPk(wrPlacementWr.get(i).getPk());
						savedPlacement.setAvantapres(unwrPlacement.getAvantapres());
						savedPlacement.setId_genre_application(unwrPlacement.getId_genre_application());
						savedPlacement.setId_webradio(unwrPlacement.getId_webradio());
						savedPlacement.setId_webradio_avantapres(unwrPlacement.getId_webradio_avantapres());
						break;
					}
				}
				
				
				
				if(isHere == false) {
					iSPlacement  = true;
					webradioPlacementService.delete(wrPlacementWr.get(i));
				}
				
			}
			for(WebradioPlacement unwrPlacement : webradio.getWrPlacement()) {
				boolean isHere=false;
				
				for(int i = 0; i<wrPlacementWr.size(); i++) {
					if(wrPlacementWr.get(i).getId_genre_application() == unwrPlacement.getId_genre_application()) {
						WebradioPlacement savedPlacement = new WebradioPlacement();
						savedPlacement.setPk(wrPlacementWr.get(i).getPk());
						savedPlacement.setAvantapres(unwrPlacement.getAvantapres());
						savedPlacement.setId_genre_application(unwrPlacement.getId_genre_application());
						savedPlacement.setId_webradio(unwrPlacement.getId_webradio());
						savedPlacement.setId_webradio_avantapres(unwrPlacement.getId_webradio_avantapres());
						savedPlacement.setUrl_logo(wrPlacementWr.get(i).getUrl_logo());
						webradioPlacementService.save(savedPlacement);
						isHere = true;
						break;
					}
				}
				
				if(isHere == false) {
					iSPlacement  = true;
					webradioPlacementService.save(unwrPlacement);
				}
				
			}
			
			
		}else {
			
			for(WebradioPlacement unwrPlacement : webradio.getWrPlacement()) {
				
				WebradioPlacement un = new WebradioPlacement();
				un.setAvantapres(unwrPlacement.getAvantapres());
				un.setId_genre_application(unwrPlacement.getId_genre_application());
				un.setId_webradio(savedWebradio.getPk());
				un.setId_webradio_avantapres(unwrPlacement.getId_webradio_avantapres());
				//un.setUrl_logo(unwrPlacement.getUrl_logo());
				iSPlacement = true;
				webradioPlacementService.save(un);
				
			}
			
			
		}
		if(initialWebradio.getPk()==0) {
			iSid_pressplay = true;
			iSnom_wr = true;
			iSclaim = true;
			iSpub = true;
			iSid_orange_genre = true;
			iSid_itunes_genre = true;
			iSid_orange_ssgenre = true;
			iSPlacement = true;
			isDateDebut = true; 
			isDateFin = true;
		}
		emailService.sendSimpleMessageWebradio(initialWebradio,webradio,iSid_pressplay, iSnom_wr, iSclaim, iSpub, iSid_orange_genre, iSid_itunes_genre, iSid_orange_ssgenre, iSPlacement,LOGO_FOLDER,isDateDebut,isDateFin);
		
		return ResponseEntity.created(location).headers(responseHeaders).body(webradio);
	}
	
	
	
	
	
	@PostMapping("/webradio_logo")
	public ResponseEntity<Object> createWebradioLogo(@RequestBody Webradio webradio) {
		HttpHeaders responseHeaders = new HttpHeaders();
	    
		Webradio savedWebradio = webradioService.save(webradio);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedWebradio.getPk()).toUri();
		
		List<WebradioPlacement> wrPlacementWr = webradioPlacementService.getAllWebradioPlacementByIdWr(savedWebradio.getPk());
		
		
		if(wrPlacementWr != null && wrPlacementWr.size() != 0) {
			
			for(int i = 0; i<wrPlacementWr.size(); i++) {
				boolean isHere = false;
				for(WebradioPlacement unwrPlacement : webradio.getWrPlacement()) {
					if(unwrPlacement.getId_genre_application()==wrPlacementWr.get(i).getId_genre_application()) {
						isHere=true;
						
						WebradioPlacement savedPlacement = new WebradioPlacement();
						savedPlacement.setPk(wrPlacementWr.get(i).getPk());
						savedPlacement.setAvantapres(unwrPlacement.getAvantapres());
						savedPlacement.setId_genre_application(unwrPlacement.getId_genre_application());
						savedPlacement.setId_webradio(unwrPlacement.getId_webradio());
						savedPlacement.setId_webradio_avantapres(unwrPlacement.getId_webradio_avantapres());
						
						
						
						break;
					}
				}
				
				
				
				if(isHere == false) {
					webradioPlacementService.delete(wrPlacementWr.get(i));
				}
				
			}
			for(WebradioPlacement unwrPlacement : webradio.getWrPlacement()) {
				boolean isHere=false;
				
				for(int i = 0; i<wrPlacementWr.size(); i++) {
					if(wrPlacementWr.get(i).getId_genre_application() == unwrPlacement.getId_genre_application()) {
						WebradioPlacement savedPlacement = new WebradioPlacement();
						savedPlacement.setPk(wrPlacementWr.get(i).getPk());
						savedPlacement.setAvantapres(unwrPlacement.getAvantapres());
						savedPlacement.setId_genre_application(unwrPlacement.getId_genre_application());
						savedPlacement.setId_webradio(unwrPlacement.getId_webradio());
						savedPlacement.setId_webradio_avantapres(unwrPlacement.getId_webradio_avantapres());
						savedPlacement.setUrl_logo(unwrPlacement.getUrl_logo());
						webradioPlacementService.save(savedPlacement);
						isHere = true;
						break;
					}
				}
				
				if(isHere == false) {
					webradioPlacementService.save(unwrPlacement);
				}
				
			}
			
			
		}else {
			
			for(WebradioPlacement unwrPlacement : webradio.getWrPlacement()) {
				
				WebradioPlacement un = new WebradioPlacement();
				un.setAvantapres(unwrPlacement.getAvantapres());
				un.setId_genre_application(unwrPlacement.getId_genre_application());
				un.setId_webradio(savedWebradio.getPk());
				un.setId_webradio_avantapres(unwrPlacement.getId_webradio_avantapres());
				un.setUrl_logo(unwrPlacement.getUrl_logo());
				
				webradioPlacementService.save(un);
				
			}
			
			
		}
		 return ResponseEntity.created(location).headers(responseHeaders).body(webradio);
	}
	
	
	
	@PostMapping(value ="/webradioplacement_logo")
	public ResponseEntity<Object> uploadLogo(MultipartFile id_logo_webradio) throws IOException {
		
		
		try {
			Path path = Paths.get(UPLOADED_FOLDER, id_logo_webradio.getOriginalFilename());
			
	        // save the file to `UPLOAD_DIR`
	        // make sure you have permission to write
	        Files.write(path, id_logo_webradio.getBytes());
		    
		  }
		  catch (Exception e) {
		    System.out.println(e.getMessage());
		    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		  }
            
		 return ResponseEntity.ok().body(UPLOADED_FOLDER+id_logo_webradio.getOriginalFilename());
	}
	
}
