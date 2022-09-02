package com.pcm.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pcm.Service.ForgotPasswordService;


@CrossOrigin("*")
@RestController
public class ForgotPasswordController {
	
	@Autowired
	private ForgotPasswordService forgotPasswordService;
	
	
	@PostMapping("/send-otp")
	public ResponseEntity<Map<String, Object>> sendOTP(@RequestParam("email") String email) throws Exception {
		System.out.println("==============================================================================================================================");
		
		System.out.println("EMAIL -> " + email);
		Map<String,Object> emailSentMap = this.forgotPasswordService.sendOTP(email);
		
		return new ResponseEntity<Map<String, Object>>(emailSentMap, HttpStatus.OK);
	}
	
	
	
	
	@PostMapping("/verify-otp")
	public ResponseEntity<Boolean> verifyOTP(@RequestParam("email") String email, @RequestParam("otp") String userOTP, @RequestParam("generatedOTP") String generatedOTP) throws Exception {
		System.out.println("==============================================================================================================================");
		
		System.out.println("EMAIL -> " + email);
		System.out.println("USER OTP -> " + userOTP);
		System.out.println("GENERATED OTP -> " + generatedOTP);
		boolean verifiedOTP = this.forgotPasswordService.verifyOTP(email, userOTP, generatedOTP);
		
		return new ResponseEntity<Boolean>(verifiedOTP, HttpStatus.OK);
	}
	
	
	
	
	@PostMapping("/reset-password")
	public ResponseEntity<String> resetPassword(@RequestParam("email") String email, @RequestParam("password") String password) throws Exception {
		System.out.println("==============================================================================================================================");
		
		System.out.println("EMAIL -> " + email);
		System.out.println("NEW PASSWORD -> " + password);
		this.forgotPasswordService.resetPassword(email, password);
		
		return new ResponseEntity<String>("Password Changed Successfully", HttpStatus.OK);
	}
}
