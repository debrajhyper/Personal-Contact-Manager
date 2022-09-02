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

import javassist.NotFoundException;

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
				System.out.println("DB USER EMAIL -> " + user.getEmail());
				
				String generatedOTP = new GenerateOTP().getOTP();
				
				this.emailService.setDetails(user.getName(), email, generatedOTP);
				boolean sendEmailSuccess = this.emailService.sendEmail();
				
				Map<String, Object> emailSentMap = new HashMap<>();
				if(sendEmailSuccess) {
					emailSentMap.put("message", "OTP sent Successfully! Please check your email");
					emailSentMap.put("generatedOTP", generatedOTP);
					emailSentMap.put("maxInActiveInterval", ((119*1000)));
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


	
	
	@Override
	public boolean verifyOTP(String email, String userOTP, String generatedOTP) throws Exception {
		// TODO Auto-generated method stub
		try {
			boolean verifiedOTP = false;
			
			if(generatedOTP != null && generatedOTP != "") {
				System.out.println("USER OTP EQUALS GENERATED OTP -> " + userOTP.equals(generatedOTP));
				
				if(userOTP.equals(generatedOTP)) {
					User user = this.userRepository.findByUserName(email);
					
					if(user == null) {
						throw new UsernameNotFoundException("User does not exist with this email!");
					}
					else {
						verifiedOTP = true;
						System.out.println("SUCCESS =================== > OTP VERIFIED SUCCESSFULLY");
					}
				}
				else {
					throw new IllegalArgumentException("You have entered wrong OTP");
				}
			}
			else {
				throw new NotFoundException("The OTP you have entered has expired");
			}
			return verifiedOTP;
		} 
		catch (UsernameNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new UsernameNotFoundException(e.getMessage());
		}
		catch (IllegalArgumentException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new IllegalArgumentException(e.getMessage());
		}
		catch (NotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new NotFoundException(e.getMessage());
		}
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception("Oops... Something went wrong.");
		}
	}




	@Override
	public void resetPassword(String email, String password) throws Exception {
		// TODO Auto-generated method stub
		try {
			User user = this.userRepository.findByUserName(email);
			
			if(user == null) {
				throw new UsernameNotFoundException("User does not exist with this email!");
			}
			else {
				user.setPassword(password);
				
				this.userRepository.save(user);
				
				System.out.println("SUCCESS =================== > PASSWORD RESET SUCCESSFULLY");
			}
		} 
		catch (UsernameNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new UsernameNotFoundException(e.getMessage());
		}
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception("Oops... Something went wrong.");
		}
	}

}
