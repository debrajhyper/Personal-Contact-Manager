package com.pcm.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pcm.Model.Contact;
import com.pcm.Model.User;
import com.pcm.Repository.ContactRepository;
import com.pcm.Repository.UserRepository;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1")
public class DetailsController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ContactRepository contactRepository;
	
	@GetMapping("/details")
	public ResponseEntity<String> getDetails() throws Exception {
		System.out.println("======================================================   [corn-job.org] APP DETAILS   =======================================================");
		
		List<User> allUsers = this.userRepository.findAll();
		List<Contact> allContacts = this.contactRepository.findAll();
		String PcmDetailS = "Total Users -> " + allUsers.size() + " | Total Contacts -> " + allContacts.size();
		System.out.println(PcmDetailS);

		return new ResponseEntity<String>(PcmDetailS, HttpStatus.OK);
	}
}
