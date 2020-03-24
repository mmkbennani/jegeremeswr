package fm.nrjaudio.jegeremeswrs.controler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import fm.nrjaudio.jegeremeswrs.service.CountryService;

@Controller
public class CountryControler {

	@Autowired
	private CountryService countryService;
	
	@GetMapping("/get_all_country/{str_brand}")
    @ResponseBody
	public ResponseEntity<Object> getAllCountry (@PathVariable String str_brand){
		HttpHeaders responseHeaders = new HttpHeaders();
		
		List<Integer> listbrand = new ArrayList<Integer>();
		
		String[] array_str_brand = str_brand.split(",");
		
		for(int i =0;i<array_str_brand.length;i++) {
			listbrand.add(Integer.parseInt(array_str_brand[i]));
			
		}
		
		
		return ResponseEntity.ok()
			      .headers(responseHeaders)
			      .body(countryService.getAllBystr_brand(listbrand));
	}
	
	
}
