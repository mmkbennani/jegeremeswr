package fm.nrjaudio.jegeremeswrs.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fm.nrjaudio.jegeremeswrs.data.Country;

public interface CountryService  extends JpaRepository<Country, Integer>{
//str_brand
	
	@Query(value = "select c.* from control.country c, control.brand b where b.id_country = c.id and b.enabled=true and c.enabled=true and b.id in :str_brand group by (c.id) order by c.name", nativeQuery = true)
	ArrayList<Country> getAllBystr_brand(@Param("str_brand")List<Integer> str_brand);
	
	/*
		
		
		*/
		
		
}
