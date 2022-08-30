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
	public ResponseEntity<Map<String, Object>> sendOTP(@RequestParam(value = "email", required = false) String email) throws Exception {
		System.out.println("==============================================================================================================================");
		
		System.out.println("FORGOT PASSWORD : EMAIL -> " + email);
		Map<String,Object> emailSentMap = this.forgotPasswordService.sendOTP(email);
		
//		return null;
		return new ResponseEntity<Map<String, Object>>(emailSentMap, HttpStatus.OK);
	}
}
