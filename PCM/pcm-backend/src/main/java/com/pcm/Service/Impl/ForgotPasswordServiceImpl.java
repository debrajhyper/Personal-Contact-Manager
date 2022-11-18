package com.pcm.Service.Impl;

import java.util.HashMap;
import java.util.Map;

import javax.mail.SendFailedException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.pcm.Constant.AppConstant;
import com.pcm.Constant.ExceptionConstant;
import com.pcm.Helper.GenerateOTP;
import com.pcm.Model.User;
import com.pcm.Repository.UserRepository;
import com.pcm.Service.EmailService;
import com.pcm.Service.ForgotPasswordService;
import com.pcm.Service.Repository.UserRepositoryService;

import javassist.NotFoundException;


@Service
public class ForgotPasswordServiceImpl implements ForgotPasswordService {

	@Autowired
	private UserRepositoryService userRepositoryService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	
	@Override
	public Map<String, Object> sendOTP(String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			System.out.println("EMAIL -> " + email);
			
			User sessionUser = this.userRepositoryService.findByUserName(email);
			System.out.println("DB USER -> ID : " + sessionUser.getId());
			
			String generatedOTP = new GenerateOTP().getOTP();
			
			this.emailService.setDetails(sessionUser.getName(), email, generatedOTP);
			boolean sendEmailSuccess = this.emailService.sendEmail();
			
			if(sendEmailSuccess) {
				Map<String, Object> emailSentMap = new HashMap<>();
				emailSentMap.put("message", "OTP sent Successfully! Please check your email");
				emailSentMap.put("generatedOTP", generatedOTP);
				emailSentMap.put("maxInActiveInterval", AppConstant.OTP_VALIDATION_TIME);
				emailSentMap.put("email", email);
				
				return emailSentMap;
			}
			else {
				throw new SendFailedException("Problem while sending OTP! Please Try again");
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
			System.out.println("EMAIL -> " + email);
			System.out.println("USER OTP -> " + userOTP);
			System.out.println("GENERATED OTP -> " + generatedOTP);
			
			boolean verifiedOTP = false;
			
			if(generatedOTP != null && generatedOTP != "") {
				System.out.println("USER OTP EQUALS GENERATED OTP -> " + userOTP.equals(generatedOTP));
				
				if(userOTP.equals(generatedOTP)) {
					User sessionUser = this.userRepositoryService.findByUserName(email);
					System.out.println("DB USER -> ID : " + sessionUser.getId());
					
					verifiedOTP = true;
					System.out.println("SUCCESS =================== > OTP VERIFIED SUCCESSFULLY");
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
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}




	@Override
	public void resetPassword(String email, String password) throws Exception {
		// TODO Auto-generated method stub
		try {
			System.out.println("EMAIL -> " + email);
			System.out.println("NEW PASSWORD -> " + password);
			
			User sessionUser = this.userRepositoryService.findByUserName(email);
			System.out.println("DB USER -> ID : " + sessionUser.getId());

			sessionUser.setPassword(this.bCryptPasswordEncoder.encode(password));
			this.userRepository.save(sessionUser);
			
			System.out.println("SUCCESS =================== > PASSWORD RESET SUCCESSFULLY");
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
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}

}
