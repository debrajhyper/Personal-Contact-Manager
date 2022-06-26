package com.pcm.Service.Impl;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.ListIterator;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pcm.Model.Contact;
import com.pcm.Model.User;
import com.pcm.Repository.ContactRepository;
import com.pcm.Repository.UserRepository;
import com.pcm.Service.ContactService;


@Service
public class ContactServiceImpl implements ContactService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ContactRepository contactRepository;
	

	@Override
	public Contact addContact(Contact contact, MultipartFile profilePic, String email) throws Exception {
		// TODO Auto-generated method stub
		User user = this.userRepository.findByUserName(email);
		System.out.println("DB USER -> " + user);
		
		List<Contact> contactsByUser = this.contactRepository.findContactsByUser(user.getId());
		ListIterator<Contact> iterateContactList = contactsByUser.listIterator();
		while(iterateContactList.hasNext()) {
			if(iterateContactList.next().getEmail().equals(contact.getEmail())) {
		    	  throw new DuplicateKeyException("Contact already exist");
			}
	    }
		
		if(profilePic.isEmpty()) {
			System.out.println("IMAGE FILE EMPTY");
			contact.setImage("default.png");
		} 
		else if(!profilePic.getContentType().equals("image/jpeg") && !profilePic.getContentType().equals("image/png")) {
			throw new ValidationException("Only JPEG/PNG content type are allowed");
		} 
		else {
			String imageName = contact.getCId() + "_" + profilePic.getOriginalFilename();
			
			contact.setImage(imageName);
			System.out.println("PROFILE PIC IMAGE NAME -> " + imageName);
			
			File saveFile = new ClassPathResource("static/upload/").getFile();
			Path path = Paths.get(saveFile.getAbsolutePath() + File.separator + imageName);
			System.out.println("IMAGE LOCATION -> " + path);
			
			Files.copy(profilePic.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
			System.out.println("IMAGE FILE SUCCESSFULLY UPLOADED");
		}
		
		if(contact.getMobileNumber() != null) {
			contact.getMobileNumber().forEach(mobileNumber -> mobileNumber.setContact(contact));
		}
		if(contact.getTelephoneNumber() != null) {
			contact.getTelephoneNumber().setContact(contact);
		}
		if(contact.getCountry() != null) {
			contact.getCountry().setContact(contact);
		}
		if(contact.getSocialLinks() != null) {
			contact.getSocialLinks().setContact(contact);
		}
		
		contact.setUser(user);
		user.getContacts().add(contact);
		user.setTotalContacts(user.getTotalContacts() + 1);
		
		User savedUserContact = this.userRepository.save(user);
		System.out.println("SAVED USER CONTACT -> " + savedUserContact);
		
		return contact;
	}


	@Override
	public List<Contact> getAllContacts(String email) throws Exception {
		// TODO Auto-generated method stub
		User user = this.userRepository.findByUserName(email);
		List<Contact> contacts = this.contactRepository.findContactsByUser(user.getId());
		return contacts;
	}

}
