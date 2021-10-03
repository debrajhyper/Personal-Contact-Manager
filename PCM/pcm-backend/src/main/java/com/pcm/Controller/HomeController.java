package com.pcm.Controller;

import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pcm.Model.Role;
import com.pcm.Model.User;
import com.pcm.Model.UserRole;
import com.pcm.Service.HomeService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class HomeController {
	
	@Autowired
	private HomeService homeService;
	
	
	//Signup User
	@PostMapping("/do_register")
	public User registerUser(@Valid @RequestBody User user) throws Exception {
		
		Set<UserRole> roles = new HashSet<>();
		
			Role role = new Role();
			role.setRoleId(101);
			role.setRoleName("NORMAL");
			
			UserRole userRole = new UserRole();
			userRole.setUser(user);
			userRole.setRole(role);
		
		roles.add(userRole);
		
		return this.homeService.registerUser(user, roles);
	}

}
