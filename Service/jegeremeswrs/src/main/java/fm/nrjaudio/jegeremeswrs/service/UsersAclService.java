package fm.nrjaudio.jegeremeswrs.service;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fm.nrjaudio.jegeremeswrs.data.UsersAcl;

public interface UsersAclService extends JpaRepository<UsersAcl, Integer>{

	/**/
	@Query(value = "from UsersAcl where id_user=:id_user")
	ArrayList<UsersAcl> getAllById_user(@Param("id_user")int id_user);
}
