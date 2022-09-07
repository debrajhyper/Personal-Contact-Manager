package com.pcm.Service.Repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pcm.Exception.ResourceNotFoundException;
import com.pcm.Model.Contact;
import com.pcm.Model.User;
import com.pcm.Repository.ContactRepository;


@Service
public class ContactRepositoryService {
	
	@Autowired
	private ContactRepository contactRepository;
	
	
	public List<Contact> findContactsByUser(int userId) {
		List<Contact> contacts = contactRepository.findContactsByUser(userId);
		return contacts;
	}
	

	public Page<Contact> findContactsByUser(int userId, Pageable pageable) {
		Page<Contact> contacts = this.contactRepository.findContactsByUser(userId, pageable);
		
		if(contacts.getTotalElements() == 0) {
			throw new ResourceNotFoundException("Currently, there are no available contacts");
		}
		if(contacts.isEmpty()) {
			throw new ResourceNotFoundException("There are no more available contacts");
		}
		return contacts;
	}
	
//	public Set<ContactMobileNumber> findMobileNumbersByContact(int contactId) {
//		Set<ContactMobileNumber> mobileNumber = this.contactRepository.findMobileNumbersByContact(contactId);
//		return mobileNumber;
//	}
	
	//SEARCH
	public List<Contact> findByNameContainingAndUser(String keyword, User user) {
		List<Contact> contacts = this.contactRepository.findByNameContainingAndUser(keyword, user);
		return contacts;
	}
	
}
