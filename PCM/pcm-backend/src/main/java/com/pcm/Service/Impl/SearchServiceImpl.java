package com.pcm.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.pcm.Model.Contact;
import com.pcm.Model.User;
import com.pcm.Repository.ContactRepository;
import com.pcm.Repository.UserRepository;
import com.pcm.Service.SearchService;

@Service
public class SearchServiceImpl implements SearchService {
	
	private static final String uploadLocation = "/upload/";
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ContactRepository contactRepository;

	@Override
	public List<Contact> searchContact(String query, String email) throws Exception {
		// TODO Auto-generated method stub
		try {			
			System.out.println("SARCH QUERY -> " + query);
			User sessionUser = this.userRepository.findByUserName(email);
			
			List<Contact> contacts = this.contactRepository.findByNameContainingAndUser(query, sessionUser);
			
			contacts.forEach(
					contact -> contact.setImage(
							ServletUriComponentsBuilder.fromCurrentContextPath().path(uploadLocation).path(contact.getImage()).toUriString()
							)
					);
			
			return contacts;
		} 
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception("Oops... Something went wrong.");
		}
	}

}
