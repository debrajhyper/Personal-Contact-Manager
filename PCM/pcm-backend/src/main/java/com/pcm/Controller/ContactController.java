package com.pcm.Controller;

import java.security.Principal;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pcm.Model.Contact;
import com.pcm.Service.ContactService;


@CrossOrigin("*")
@RestController
public class ContactController {
	
	@Autowired
	private ContactService contactService;
	
//	@RequestMapping(value = "/add-contact", method = RequestMethod.POST, consumes = {"multipart/form-data"})
	@PostMapping("/add-contact")
	public ResponseEntity<String> addContact(@Valid @ModelAttribute Contact contact, @RequestParam(value = "profilePic", required = false) MultipartFile profilePic, Principal principal ) throws Exception {
		
		String email = principal.getName();
		
		Contact addContact = this.contactService.addContact(contact, profilePic, email);
		
		System.out.println("FINAL DB CONTACT -> " + addContact);
		
		return new ResponseEntity<String>("Contact Added Successfully", HttpStatus.OK);
	}
	
	
	@GetMapping("/get-all-contact")
	public ResponseEntity<List<Contact>> getAllContacts(Principal principal) throws Exception {
		String email = principal.getName();
		return new ResponseEntity<List<Contact>>(this.contactService.getAllContacts(email), HttpStatus.OK);
	}

}
