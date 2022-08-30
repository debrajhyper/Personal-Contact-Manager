package com.pcm.Helper;

import com.pcm.Constant.AppConstant;

public class GenerateOTP {
	private String otp;

	public GenerateOTP() {
		super();
		// TODO Auto-generated constructor stub
		this.otp = AppConstant.RANDOM_OTP;
	}
	
	public GenerateOTP(String otp) {
		super();
		this.otp = otp;
	}
	
	public String getOTP() {
		return otp;
	}

}
