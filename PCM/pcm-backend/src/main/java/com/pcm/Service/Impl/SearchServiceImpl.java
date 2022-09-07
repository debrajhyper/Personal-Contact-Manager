package com.pcm.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.pcm.Constant.AppConstant;
import com.pcm.Constant.ExceptionConstant;
import com.pcm.Model.Contact;
import com.pcm.Model.User;
import com.pcm.Repository.ContactRepository;
import com.pcm.Service.SearchService;
import com.pcm.Service.Repository.UserRepositoryService;

@Service
public class SearchServiceImpl implements SearchService {

	@Autowired
	private UserRepositoryService userRepositoryService;
	
	@Autowired
	private ContactRepository contactRepository;

	
	@Override
	public List<Contact> searchContact(String query, String email) throws Exception {
		// TODO Auto-generated method stub
		try {			
			System.out.println("SARCH QUERY -> " + query);
			
			User sessionUser = this.userRepositoryService.findByUserName(email);
			System.out.println("DB USER -> ID : " + sessionUser.getId());
			
			List<Contact> contacts = this.contactRepository.findByNameContainingAndUser(query, sessionUser);
			
			contacts.forEach(
					contact -> contact.setImage(
							ServletUriComponentsBuilder.fromCurrentContextPath().path(AppConstant.GET_UPLOAD_LOCATION).path(contact.getImage()).toUriString()
							)
					);
			
			return contacts;
		} 
		catch(UsernameNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new UsernameNotFoundException(e.getMessage());
		}
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}

}
