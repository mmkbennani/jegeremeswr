package fm.nrjaudio.jegeremeswrs.controler;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import fm.nrjaudio.jegeremeswrs.data.ArrayBrandParamsDB;
import fm.nrjaudio.jegeremeswrs.data.BrandParamsDB;
import fm.nrjaudio.jegeremeswrs.data.CountBrand;
import fm.nrjaudio.jegeremeswrs.service.BrandService;
import fm.nrjaudio.jegeremeswrs.service.WebradioService;

@Controller
public class BrandControler {

	@Autowired
	private BrandService brandService;
	@Autowired
	WebradioService webradioService;
	
	@GetMapping("/get_all_brand/{id_country}")
    @ResponseBody
	public ResponseEntity<Object> getAllBrand (@PathVariable Integer id_country){
		HttpHeaders responseHeaders = new HttpHeaders();
		LocalDateTime localdatetimenow = LocalDateTime.now();
	    ArrayList<BrandParamsDB> ArBP = new ArrayList<BrandParamsDB>(); //brandService.getAllById_country(id_country);
	    
	    ArrayList<ArrayBrandParamsDB> arrayParamList = new ArrayList<ArrayBrandParamsDB>();
	    ArBP = brandService.getAllById_country(id_country);
    	
    	for(BrandParamsDB bP : ArBP) {
    		ArrayBrandParamsDB arrayParam = new ArrayBrandParamsDB();
    		
    		
    		ArrayList<CountBrand> cntbd = new ArrayList<CountBrand>();
    		
    		arrayParam.setEnabled(bP.isEnabled());
    		arrayParam.setId(bP.getId());
    		arrayParam.setId_country(id_country);
    		arrayParam.setName(bP.getName());
    		arrayParam.setSys_created_date(bP.getSys_created_date());
    		arrayParam.setSys_modified_date(bP.getSys_modified_date());
    		arrayParam.setChemin_logo(bP.getChemin_logo());
    		arrayParam.setColor_brand(bP.getColor_brand());
    		//countwronline.get(0).getCount() == null ? 0 : countwronline.get(0).getCount()
    		ArrayList<BrandParamsDB> countwronline = brandService.getAllById_countryCountOnline(id_country, localdatetimenow,bP.getId());
    		cntbd.add(new CountBrand(countwronline.get(0).getCount() == null ? 0 : countwronline.get(0).getCount(), "online"));
    		
    		ArrayList<BrandParamsDB> countwroffline = brandService.getAllById_countryCountOffline(id_country, localdatetimenow,bP.getId());
    		cntbd.add(new CountBrand(countwroffline.get(0).getCount() == null ? 0 : countwroffline.get(0).getCount(), "offline"));
    		
    		ArrayList<BrandParamsDB> countwrprochainement = brandService.getAllById_countryCountProcahinement(id_country, localdatetimenow,bP.getId());
    		cntbd.add(new CountBrand(countwrprochainement.get(0).getCount() == null ? 0 : countwrprochainement.get(0).getCount(), "prochainement"));
    		
    		arrayParam.setCountBrand(cntbd);
    		
    		arrayParamList.add(arrayParam);
    	}		
		return ResponseEntity.ok()
			      .headers(responseHeaders)
			      .body(arrayParamList);
	}
}
