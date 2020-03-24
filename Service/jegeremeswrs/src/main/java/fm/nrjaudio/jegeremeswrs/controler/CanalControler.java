package fm.nrjaudio.jegeremeswrs.controler;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import fm.nrjaudio.jegeremeswrs.data.Canal;
import fm.nrjaudio.jegeremeswrs.data.CanalWebradio;
import fm.nrjaudio.jegeremeswrs.data.PourcentCanalDispo;
import fm.nrjaudio.jegeremeswrs.data.Webradio;
import fm.nrjaudio.jegeremeswrs.data.WebradioPlacement;
import fm.nrjaudio.jegeremeswrs.service.CanalService;
import fm.nrjaudio.jegeremeswrs.service.WebradioService;

@Controller
public class CanalControler {
	
	@Autowired
	private CanalService canalService;
	@Autowired
	WebradioService webradioService;
	
	
	@GetMapping("/get_all_canaux/{id_country}")
    @ResponseBody
	public List<CanalWebradio> getAllCanaux (@PathVariable int id_country){
		List<CanalWebradio> listCanauxRetour = new ArrayList<CanalWebradio>();
		ArrayList<Canal> canaux = canalService.findCanalByCountry(id_country);
		
		for(Canal canal : canaux) {
			CanalWebradio canalWebradio = new CanalWebradio();
			canalWebradio.setDate_disponnible(canal.getDate_disponnible());
			canalWebradio.setFk_country(canal.getFk_country());
			canalWebradio.setId_wr(canal.getId_wr());
			canalWebradio.setIsAgregatteur(canal.isAgregatteur());
			canalWebradio.setIsApplication(canal.isApplication());
			canalWebradio.setIsSite(canal.isSite());
			canalWebradio.setNom_canal(canal.getNom_canal());
			canalWebradio.setId_canal(canal.getId_canal());
			if(canal.getId_wr() > 0) {
				Optional<Webradio> webradio = webradioService.findById(canal.getId_wr());
				if(webradio.isPresent()) {
					canalWebradio.setId_pressplay(webradio.get().getId_pressplay());
					canalWebradio.setNom_webradio(webradio.get().getNom_wr());
				}else {
					canalWebradio.setId_pressplay(-1);
					canalWebradio.setNom_webradio("");
				}
				
			}else {
				canalWebradio.setId_pressplay(-1);
				canalWebradio.setNom_webradio("");
			}
			listCanauxRetour.add(canalWebradio);
		}
		return listCanauxRetour;
	}
	
	@GetMapping("/get_canaux_dispo/{date_dispo}")
    @ResponseBody
	public List<Canal> getAllCanauxDispo (@PathVariable String date_dispo){
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime date_dispoconvert = LocalDateTime.parse(date_dispo, formatter) ;
		return canalService.findCanauxDispo(date_dispoconvert);
	}
	
	@GetMapping("/get_first_canal_dispo/{id_country}")
    @ResponseBody
	public Canal getFirstCanauxDispo (@PathVariable int id_country){
		List<Canal> listCanaux = canalService.findPremierCanauxDispo(id_country);
		if(listCanaux != null && listCanaux.size() != 0) {
			return listCanaux.get(0);
		}else {
			return new Canal(id_country, -1, null, "", false, false, false);
		}
		
	}
	
	
	@GetMapping("/get_pourcent_canal_dispo/{id_country}")
    @ResponseBody
	public List<PourcentCanalDispo> getPourcentageCanaux (@PathVariable int id_country){
		List<PourcentCanalDispo> listCanauxNonDispo = canalService.findPourcentByCountry(id_country);
		List<Canal> listAllCanaux = canalService.findCanalByCountry(id_country);
		List<PourcentCanalDispo> listCanauxReturn = new ArrayList<PourcentCanalDispo>();
		
		if(listCanauxNonDispo != null && listCanauxNonDispo.size() != 0) {
			PourcentCanalDispo pourcentCanalNonDispo = listCanauxNonDispo.get(0);
			long nbrallcanaux = listAllCanaux.size();
			listCanauxReturn.add(new PourcentCanalDispo((pourcentCanalNonDispo.getValue()*100/nbrallcanaux),"#FF6B6B"));
			listCanauxReturn.add(new PourcentCanalDispo(((nbrallcanaux-pourcentCanalNonDispo.getValue())*100/nbrallcanaux),"#FDFDFD"));
			return listCanauxReturn;
		}else {
			listCanauxReturn.add(new PourcentCanalDispo(0,"#FF6B6B"));
			listCanauxReturn.add(new PourcentCanalDispo(100,"#FDFDFD"));
			return listCanauxReturn;
		}
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	///////////// POST
	
	/*
	
	@PostMapping(value = "/canal_p")
	public ResponseEntity<Object> createCanal(@RequestBody CanalWebradioInsUpd canalWebradioInsUpd) {
		
		Canal canal =canalWebradioInsUpd.getCanal();
		
		
		canal.setId_wr(canalWebradioInsUpd.getId_wr());
		//canal.setNom_canal(canalWebradioInsUpd.getCanal());
		
		
		Canal savedCanal = canalService.save(canal);
	*/
	@PostMapping(value = "/canal_p")
	public ResponseEntity<Object> createCanal(@RequestBody CanalWebradio canalWebradio) {
		
		Canal canal = new Canal();
		canal.setDate_disponnible(canalWebradio.getDate_disponnible());
		canal.setFk_country(canalWebradio.getFk_country());
		canal.setId_wr(canalWebradio.getId_wr());
		canal.setAgregatteur(canalWebradio.getIsAgregatteur());
		canal.setApplication(canalWebradio.getIsApplication());
		canal.setSite(canalWebradio.getIsSite());
		canal.setNom_canal(canalWebradio.getNom_canal());
		
		if(canalWebradio.getId_canal() != 0) {
			canal.setId_canal(canalWebradio.getId_canal());
		}
		Canal savedCanal = canalService.save(canal);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedCanal.getId_canal()).toUri();

		return ResponseEntity.created(location).body(canal);
	}
	
	
	
	@DeleteMapping(value = "/canal_d")
	public ResponseEntity<Object> DeleteCanal(@RequestBody Canal canal) {
		
		
		canalService.delete(canal);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(canal.getId_canal()).toUri();

		return ResponseEntity.created(location).body(canal);
	}
	
	

}
