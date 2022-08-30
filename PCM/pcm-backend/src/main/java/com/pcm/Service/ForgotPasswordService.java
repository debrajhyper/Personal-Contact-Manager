package com.pcm.Service;

import java.util.Map;

public interface ForgotPasswordService {
	
	//SEND OTP
	public Map<String, Object> sendOTP(String email) throws Exception;
}
