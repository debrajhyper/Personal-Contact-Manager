package com.pcm.Service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.pcm.Model.Contact;

public interface ContactService {
	
	//ADD CONTACT
	public void addContact(Contact contact, MultipartFile profilePic, String email) throws Exception;
	
	//GET ALL CONTACTS
	public List<Contact> getAllContacts(String email) throws Exception;
	
	//VIEW CONTACTS
	public Page<Contact> viewContacts(Integer page, String email) throws Exception;
	
	//VIEW CONTACT
	public Contact viewContact(Integer cId, String email) throws Exception;
	
	//UPDATE CONTACT
	public void updateContact(Contact contact, MultipartFile profilePic, String email) throws Exception;
	
	//DELETE MULTIPLE CONTACTS
	public void deleteSelectedContacts(List<Integer> deleteIds, String email) throws Exception;
	
	//DELETE CONTACT
	public void deleteContact(Integer cId, String email) throws Exception;
		
}
