package fm.nrjaudio.jegeremeswrs.service;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fm.nrjaudio.jegeremeswrs.data.Brand;
import fm.nrjaudio.jegeremeswrs.data.BrandParamsDB;
import fm.nrjaudio.jegeremeswrs.data.WebradioCount;

public interface BrandService  extends JpaRepository<Brand, Integer>{

	
	@Query(value = "select new fm.nrjaudio.jegeremeswrs.data.BrandParamsDB( b, bp.chemin_logo,bp.color_brand) from Brand b, BrandParams bp where b.id_country = :id_country and b.enabled=true and bp.id_radio=b.id")
	ArrayList<BrandParamsDB> getAllById_country(@Param("id_country")int id_country);
	
	//@Query(value = "select new fm.nrjaudio.jegeremeswrs.data.BrandParamsDB( b,(select count(*) from Webradio w where w.id_country = :id_country and w.id_radio=b.id group by w.id_radio order by w.id_radio), bp.chemin_logo,bp.color_brand) from Brand b, BrandParams bp where b.id_country = :id_country and b.enabled=true and bp.id_radio=b.id")
	//ArrayList<BrandParamsDB> getAllById_countryCount(@Param("id_country")int id_country);
	
	
	@Query(value = "select new fm.nrjaudio.jegeremeswrs.data.BrandParamsDB( b,(select count(*) from Webradio w where w.id_country = :id_country and w.id_radio=b.id and w.id_radio = :id_radio and (w.date_deletion_request is null or w.date_deletion_request >= :date_now) and (w.date_creation_request <= :date_now) group by w.id_radio order by w.id_radio), bp.chemin_logo,bp.color_brand,'online') from Brand b, BrandParams bp where b.id_country = :id_country and b.enabled=true and bp.id_radio=b.id and b.id = :id_radio")
	ArrayList<BrandParamsDB> getAllById_countryCountOnline(@Param("id_country")int id_country,@Param("date_now")LocalDateTime date_now, @Param("id_radio")int id_radio);
	
	
	@Query(value = "select new fm.nrjaudio.jegeremeswrs.data.BrandParamsDB( b,(select count(*) from Webradio w where w.id_country = :id_country and w.id_radio=b.id and w.id_radio = :id_radio and (w.date_deletion_request < :date_now) group by w.id_radio order by w.id_radio), bp.chemin_logo,bp.color_brand,'offline') from Brand b, BrandParams bp where b.id_country = :id_country and b.enabled=true and bp.id_radio=b.id and b.id = :id_radio")
	ArrayList<BrandParamsDB> getAllById_countryCountOffline(@Param("id_country")int id_country,@Param("date_now")LocalDateTime date_now, @Param("id_radio")int id_radio);
	
	
	@Query(value = "select new fm.nrjaudio.jegeremeswrs.data.BrandParamsDB( b,(select count(*) from Webradio w where w.id_country = :id_country and w.id_radio=b.id and w.id_radio = :id_radio and (w.date_deletion_request is null or w.date_deletion_request > :date_now) and (w.date_creation_request > :date_now) group by w.id_radio order by w.id_radio), bp.chemin_logo,bp.color_brand,'procahinement') from Brand b, BrandParams bp where b.id_country = :id_country and b.enabled=true and bp.id_radio=b.id and b.id = :id_radio")
	ArrayList<BrandParamsDB> getAllById_countryCountProcahinement(@Param("id_country")int id_country,@Param("date_now")LocalDateTime date_now, @Param("id_radio")int id_radio);
	
}
