package com.pcm.Controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.pcm.Model.Contact;
import com.pcm.Service.SearchService;


@CrossOrigin("*")
@RestController
public class SearchController {
	
	@Autowired
	private SearchService searchService;
	
	@GetMapping("/search/{query}")
	public ResponseEntity<List<Contact>> search(@PathVariable("query") String query, Principal principal) throws Exception {
		System.out.println("==============================================================================================================================");
		
		String email = principal.getName();
		List<Contact> searchContact = this.searchService.searchContact(query, email);
		
		return new ResponseEntity<List<Contact>>(searchContact, HttpStatus.OK);
	}
}
