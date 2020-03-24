package fm.nrjaudio.jegeremeswrs.service;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fm.nrjaudio.jegeremeswrs.data.Users;

public interface UsersService extends JpaRepository<Users, Integer>{

}
