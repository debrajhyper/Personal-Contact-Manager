package com.pcm.Helper;

public class GenerateOTP {
	private String otp;

	public GenerateOTP() {
		// TODO Auto-generated constructor stub
		super();
		this.otp = String.valueOf((int)((Math.random()*900000)+100000));
	}
	
	public GenerateOTP(String otp) {
		super();
		this.otp = otp;
	}
	
	public String getOTP() {
		return otp;
	}

}
