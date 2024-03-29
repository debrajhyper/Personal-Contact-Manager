package com.pcm.Controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pcm.Constant.MessageConstant;
import com.pcm.Model.Contact;
import com.pcm.Service.ContactService;


@CrossOrigin("*")
@RestController
public class ContactController {
	
	@Autowired
	private ContactService contactService;
	
	
	@PostMapping("/add-contact")
	public ResponseEntity<String> addContact(@Valid @ModelAttribute Contact contact, @RequestParam(value = "profilePic", required = false) MultipartFile profilePic, Principal principal) throws Exception {
		System.out.println("======================================================   ADD CONTACT   =======================================================");
		
		String email = principal.getName();
		this.contactService.addContact(contact, profilePic, email);
		
		return new ResponseEntity<String>(MessageConstant.ADD_CONTACT_SUCCESS, HttpStatus.CREATED);
	}
	
	
	
	
	@GetMapping("/get-all-contact")
	public ResponseEntity<List<Contact>> getAllContacts(Principal principal) throws Exception {
		System.out.println("======================================================   GET ALL CONTACTS   =======================================================");
		
		String email = principal.getName();
		List<Contact> allContacts = this.contactService.getAllContacts(email);
		
		return new ResponseEntity<List<Contact>>(allContacts, HttpStatus.OK);
	}
	
	
	
	
	@GetMapping("/view-contacts/{page}")
	public ResponseEntity<Map<String, Object>> viewContacts(@PathVariable("page") int page, Principal principal) throws Exception {
		System.out.println("======================================================   VIEW CONTACTS   =======================================================");
		
		String email = principal.getName();
		Page<Contact> viewContacts = this.contactService.viewContacts(page, email);

		Map<String, Object> viewContactsMap = new HashMap<>();
		viewContactsMap.put("contacts", viewContacts);
		viewContactsMap.put("totalContacts", viewContacts.getTotalElements());
		viewContactsMap.put("page", page);
		viewContactsMap.put("totalPages", viewContacts.getTotalPages());
		
		return new ResponseEntity<Map<String, Object>>(viewContactsMap, HttpStatus.OK);
	}
	
	
	
	
	@GetMapping("/view-contact/{cId}")
	public ResponseEntity<Contact> viewContact(@PathVariable("cId") int cId, Principal principal) throws Exception {
		System.out.println("======================================================   VIEW CONTACT   =======================================================");
		
		String email = principal.getName();
		Contact contact = this.contactService.viewContact(cId, email);
		
		return new ResponseEntity<Contact>(contact, HttpStatus.OK);
	}
	
	
	
	
	@DeleteMapping("/delete-selected-contacts/{deleteIds}")
	public ResponseEntity<String> deleteSelectedContacts(@PathVariable("deleteIds") List<Integer> deleteIds, Principal principal) throws Exception {
		System.out.println("======================================================   DELETE SELECTED CONTACTS   =======================================================");
		
		String email = principal.getName();
		this.contactService.deleteSelectedContacts(deleteIds, email);
		
		return new ResponseEntity<String>(MessageConstant.DELETE_SELECTED_CONTACTS_SUCCESS, HttpStatus.OK);
	}
	
	
	
	
	@DeleteMapping("/delete-contact/{cId}")
	public ResponseEntity<String> deleteContact(@PathVariable("cId") int cId, Principal principal) throws Exception {
		System.out.println("======================================================   DELETE CONTACT   =======================================================");
		
		String email = principal.getName();
		this.contactService.deleteContact(cId, email);
		
		return new ResponseEntity<String>(MessageConstant.DELETE_CONTACT_SUCCESS, HttpStatus.OK);
	}
	
	
	
	
	@PutMapping("/update-contact")
	public ResponseEntity<String> updateContact(@Valid @ModelAttribute Contact contact, @RequestParam(value = "profilePic", required = false) MultipartFile profilePic, Principal principal) throws Exception {
		System.out.println("======================================================   UPDATE CONTACT   =======================================================");
		
		String email = principal.getName();
		this.contactService.updateContact(contact, profilePic, email);
		
		return new ResponseEntity<String>(MessageConstant.UPDATE_CONTACT_SUCCESS, HttpStatus.OK);
	}
	

}
