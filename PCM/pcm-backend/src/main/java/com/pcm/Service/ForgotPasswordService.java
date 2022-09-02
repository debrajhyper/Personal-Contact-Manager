package com.pcm.Service;

import java.util.Map;

public interface ForgotPasswordService {
	
	//SEND OTP
	public Map<String, Object> sendOTP(String email) throws Exception;
	
	//VERIFY OTP
	public boolean verifyOTP(String email, String userOTP, String generatedOTP) throws Exception;
	
	//RESET PASSWORD
	public void resetPassword(String email, String password) throws Exception;
}
