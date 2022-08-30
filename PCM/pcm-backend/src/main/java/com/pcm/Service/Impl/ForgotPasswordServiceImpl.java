package com.pcm.Service.Impl;

import java.util.HashMap;
import java.util.Map;

import javax.mail.SendFailedException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pcm.Helper.GenerateOTP;
import com.pcm.Model.User;
import com.pcm.Repository.UserRepository;
import com.pcm.Service.EmailService;
import com.pcm.Service.ForgotPasswordService;

@Service
public class ForgotPasswordServiceImpl implements ForgotPasswordService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private EmailService emailService;
	
	@Override
	public Map<String, Object> sendOTP(String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User user = this.userRepository.findByUserName(email);
			
			
			if(user == null) {
				throw new UsernameNotFoundException("Sorry, we couldn't find an account with that email address");
			}
			else {
				String generatedOTP = new GenerateOTP().getOTP();
				System.out.println("FORGOT PASSWORD : OTP -> " + generatedOTP);
				
				this.emailService.setDetails(user.getName(), email, generatedOTP);
				boolean sendEmailSuccess = this.emailService.sendEmail();
				
				Map<String, Object> emailSentMap = new HashMap<>();
				if(sendEmailSuccess) {
					emailSentMap.put("message", "OTP sent Successfully! Please check your email");
					emailSentMap.put("generatedOTP", generatedOTP);
					emailSentMap.put("maxInActiveInterval", (5*(60*1000)));
					emailSentMap.put("email", email);
					
					return emailSentMap;
				}
				else {
					throw new SendFailedException("Problem while sending OTP! Please Try again");
				}
			}
		} 
		catch (UsernameNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new UsernameNotFoundException(e.getMessage());
		}
		catch(SendFailedException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new SendFailedException(e.getMessage());
		}
//		catch (Exception e) {
//			// TODO: handle exception
//			System.out.println("ERROR -> " + e.getMessage());
//			e.printStackTrace();
//			throw new Exception("Oops... Something went wrong.");
//		}
	}
	
}
