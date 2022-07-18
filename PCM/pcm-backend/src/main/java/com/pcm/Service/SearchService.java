package com.pcm.Service;

import java.util.List;

import com.pcm.Model.Contact;

public interface SearchService {
	
	public List<Contact> searchContact(String query, String email) throws Exception;
}
