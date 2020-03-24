package fm.nrjaudio.jegeremeswrs.controler;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import fm.nrjaudio.jegeremeswrs.data.BrandParamsDB;
import fm.nrjaudio.jegeremeswrs.data.UsersAcl;
import fm.nrjaudio.jegeremeswrs.service.UsersAclService;

@Controller
public class UsersAclControler {

	/**/
	@Autowired
	private UsersAclService usersAclService;
	
	
	

	@GetMapping("/get_all_acl/{id_user}")
    @ResponseBody
	public ResponseEntity<Object> getAllBrand (@PathVariable Integer id_user){
		HttpHeaders responseHeaders = new HttpHeaders();
	    
	    ArrayList<UsersAcl> ArBP = usersAclService.getAllById_user(id_user);
	
		return ResponseEntity.ok()
			      .headers(responseHeaders)
			      .body(ArBP);
	}
	
	
}
