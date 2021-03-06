package com.pcm.Controller;

import java.security.Principal;
import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pcm.Model.Role;
import com.pcm.Model.User;
import com.pcm.Model.UserRole;
import com.pcm.Service.UserService;


@CrossOrigin("*")
@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	
	//USER SIGNUP
	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@Valid @RequestBody User user) throws Exception {
		
		Set<UserRole> roles = new HashSet<>();
		
			Role role = new Role();
			role.setRoleId(101);
			role.setRoleName("NORMAL");
			
			UserRole userRole = new UserRole();
			userRole.setUser(user);
			userRole.setRole(role);
		
		roles.add(userRole);
		
		User createdUser =  this.userService.registerUser(user, roles);
		return new ResponseEntity<User>(createdUser, HttpStatus.CREATED);
	}
	
	
	//CURRENT USER
	@GetMapping("/current-user")
	public ResponseEntity<User> getCurrentUser(Principal principal) throws Exception {
		
		String email = principal.getName();
		User currentUser = this.userService.currentUser(email);
		
		return new ResponseEntity<User>(currentUser, HttpStatus.OK);
	}

}
