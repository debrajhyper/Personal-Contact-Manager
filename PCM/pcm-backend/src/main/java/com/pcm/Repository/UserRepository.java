package com.pcm.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pcm.Model.User;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	//Signup User
	@Query("select u from User u where u.email = :email")
	public User findByUserName(@Param("email") String email);

//	@Query("select u from User u where u.email = :email")
//	public User getUserByUserName(@Param("email") String email);

}
