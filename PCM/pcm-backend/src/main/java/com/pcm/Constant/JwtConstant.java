package com.pcm.Constant;

public class JwtConstant {
	
	public static final String REQUEST_HEADER = "Authorization";
	
	public static final String TOKEN_PREFIX = "Bearer ";
	
	public static final String SECRET_KEY = "contactmanager";

	public static final Integer EXPIRATION_TIME = 1000 * 60 * 60 * 24;				//24 HOURS EXPIRATION TIME
	
//	public static final Integer EXPIRATION_TIME = 1000 * 60 * 60 * 1 / 60 / 10;		//6 SEC EXPIRATION TIME
	
}
