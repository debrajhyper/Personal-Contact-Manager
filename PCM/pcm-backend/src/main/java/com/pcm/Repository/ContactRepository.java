package com.pcm.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pcm.Model.Contact;
import com.pcm.Model.User;


@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer> {
	
	@Query("from Contact as c where c.user.id = :userId")
	public List<Contact> findContactsByUser(@Param("userId") int userId);
	
	@Query("from Contact as c where c.user.id = :userId")
	public Page<Contact> findContactsByUser(@Param("userId") int userId, Pageable pageable);
	
//	@Query("from ContactMobileNumber as cmn where cmn.contact.id = :contactId")
//	public Set<ContactMobileNumber> findMobileNumbersByContact(@Param("contactId") int contactId);
	
	//SEARCH
	public List<Contact> findByNameContainingAndUser(String keyword, User user);
}
