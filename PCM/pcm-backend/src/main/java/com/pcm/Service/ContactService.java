package com.pcm.Service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.pcm.Model.Contact;

public interface ContactService {
	
	//ADD CONTACT
	public Contact addContact(Contact contact, MultipartFile profilePic, String email) throws Exception;
	
	//UPDATE CONTACT
	
	//GET ALL CONTACTS
	public List<Contact> getAllContacts(String email) throws Exception;
	
	//GET CONTACT
	
	//DELETE CONTACT
	
}
