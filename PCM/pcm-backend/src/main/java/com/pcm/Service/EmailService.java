package com.pcm.Service;

public interface EmailService {
	
	public void setDetails(String userName, String email, String generatedOTP);
	
	public boolean sendEmail() throws Exception;

}
