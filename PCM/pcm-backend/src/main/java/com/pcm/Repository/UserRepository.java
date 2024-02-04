package com.pcm.Repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pcm.Model.User;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	//FIND USER BY USER EMAIL
	@Query("select u from User u where u.email = :email")
	public User findByUserName(@Param("email") String email);
	
	//FIND ALL DEMO USERS BY EMAIL PATTERN
    @Query("SELECT u FROM User u WHERE u.email LIKE 'demo\\_%\\_@pcm.com'")
    List<User> findAllDemoUsers();
    
    //FIND ALL DEMO USERS CREATED 10DAYS BEFORE
    @Query("SELECT u FROM User u WHERE (u.email LIKE 'demo\\_%\\_@pcm.com') AND (u.connectedWithUS < :timestamp)")
    List<User> findAllDemoUsersCreatedBefore(@Param("timestamp") Timestamp timestamp);

}
