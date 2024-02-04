package com.pcm.Controller;

import java.security.Principal;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Pattern;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pcm.Constant.DemoUserConstant;
import com.pcm.Constant.MessageConstant;
import com.pcm.Constant.RoleConstant;
import com.pcm.Model.Role;
import com.pcm.Model.User;
import com.pcm.Model.UserRole;
import com.pcm.Service.DemoUserService;
import com.pcm.Service.UserService;


@CrossOrigin("*")
@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private DemoUserService demoUserService;
	
	
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@Valid @RequestBody User user) throws Exception {
		System.out.println("======================================================   USER SIGNUP   =======================================================");
		
		Set<UserRole> roles = new HashSet<>();
		
			Role role = new Role();
			role.setRoleId(RoleConstant.ROLE_ID);
			role.setRoleName(RoleConstant.ROLE_NAME);
			
			UserRole userRole = new UserRole();
			userRole.setUser(user);
			userRole.setRole(role);
		
		roles.add(userRole);
		
		this.userService.registerUser(user, roles);
		
		return new ResponseEntity<String>(MessageConstant.REGISTER_USER_SUCCESS, HttpStatus.CREATED);
	}
	
	
	
	
	@GetMapping("/current-user")
	public ResponseEntity<User> getCurrentUser(Principal principal) throws Exception {
		System.out.println("======================================================   CURRENT USER   =======================================================");
		
		String email = principal.getName();
		User sessionUser = this.userService.currentUser(email);
		
		return new ResponseEntity<User>(sessionUser, HttpStatus.OK);
	}
	
	
	
	
	@PutMapping("/update-user")
	public ResponseEntity<String> updateUser(@Valid @ModelAttribute User user, @RequestParam(value = "profilePic", required = false) MultipartFile profilePic, Principal principal) throws Exception {
		System.out.println("======================================================   UPDATE USER   =======================================================");
		
		String email = principal.getName();
		this.userService.updateUser(user, profilePic, email);
		
		return new ResponseEntity<String>(MessageConstant.UPDATE_USER_SUCCESS, HttpStatus.OK);
	}
	
	
	
	
	@GetMapping("/logout-user")
	public ResponseEntity<String> logoutUser(Principal principal) throws Exception {
		System.out.println("======================================================   USER LOGGED OUT   =======================================================");

		String userEmail = principal.getName();
		
		Pattern pattern = Pattern.compile(DemoUserConstant.DEMO_USER_EMAIL_REGEX);
		if(pattern.matcher(userEmail).matches()) {
			this.demoUserService.removeDemotUserWithSession(userEmail);
		} else {
			this.userService.logoutUser(userEmail);			
		}
		
		return new ResponseEntity<String>(MessageConstant.LOGOUT_USER_SUCCESS, HttpStatus.OK);
	}

}
