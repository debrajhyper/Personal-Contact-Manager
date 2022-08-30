package com.pcm.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pcm.Config.JwtUtils;
import com.pcm.Config.UserDetailsServiceImpl;
import com.pcm.Model.JwtRequest;
import com.pcm.Model.JwtResponse;


@CrossOrigin("*")
@RestController
public class AuthenticateController {
	
	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtUtils jwtUtils;
	
	
	//GENERATE TOKEN
	@PostMapping("/generate-token")
	public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
		System.out.println("==============================================================================================================================");
		
		try {
			if(jwtRequest.getUsername() == "" || jwtRequest.getPassword() == "") {
				throw new BadCredentialsException("Missing email address or passward");
			}
			this.userDetailsServiceImpl.loadUserByUsername(jwtRequest.getUsername());
			authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
		}
		catch (UsernameNotFoundException e) {
			// TODO: handle exception
			e.printStackTrace();
			throw new UsernameNotFoundException("Sorry, we couldn't find an account with that email address");
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
			e.printStackTrace();
			throw new DisabledException("User Disabled");
		}
		catch (BadCredentialsException e) {
			// TODO: handle exception
			e.printStackTrace();
			throw new BadCredentialsException("Sorry, that password isn't right");
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new Exception("Oops... Something Went Wrong");
		}
	}
	
}
