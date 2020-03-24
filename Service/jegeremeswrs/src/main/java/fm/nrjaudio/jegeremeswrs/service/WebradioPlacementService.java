package fm.nrjaudio.jegeremeswrs.service;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fm.nrjaudio.jegeremeswrs.data.WebradioPlacement;

public interface WebradioPlacementService extends JpaRepository<WebradioPlacement, Integer>{

	@Query(value = "from WebradioPlacement where id_webradio = :id_webradio")
	ArrayList<WebradioPlacement> getAllWebradioPlacementByIdWr(@Param("id_webradio")int id_webradio);
}
