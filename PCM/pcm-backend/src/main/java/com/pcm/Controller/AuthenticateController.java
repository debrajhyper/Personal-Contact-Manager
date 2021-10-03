package com.pcm.Controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pcm.Config.JwtUtils;
import com.pcm.Config.UserDetailsServiceImpl;
import com.pcm.Model.JwtRequest;
import com.pcm.Model.JwtResponse;
import com.pcm.Model.User;


@CrossOrigin("*")
@RestController
public class AuthenticateController {
	
	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtUtils jwtUtils;
	
	
	// generate token
	@PostMapping("/generate-token")
	public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
		try {
			this.userDetailsServiceImpl.loadUserByUsername(jwtRequest.getUsername());
			authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
		}
		catch (UsernameNotFoundException e) {
			// TODO: handle exception
			e.printStackTrace();
			throw new UsernameNotFoundException("We cannot find an account with that email address");
		}
		
		UserDetails userDetails = this.userDetailsServiceImpl.loadUserByUsername(jwtRequest.getUsername());
		String token = this.jwtUtils.generateToken(userDetails);
		
		return ResponseEntity.ok(new JwtResponse(token));
	}
	
	
	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		}
		catch (DisabledException e) {
			// TODO: handle exception
			e.printStackTrace();;
			throw new DisabledException("User Disabled");
		}
		catch (BadCredentialsException e) {
			// TODO: handle exception
			e.printStackTrace();;
			throw new BadCredentialsException("Invalid username or password");
		}
	}
	
	
	@GetMapping("/current-user")
	public User getCurrentUser(Principal principal) {
		return (User) this.userDetailsServiceImpl.loadUserByUsername(principal.getName());
	}
}
