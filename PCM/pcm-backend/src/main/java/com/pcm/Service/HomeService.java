package com.pcm.Service;

import java.util.Set;

import com.pcm.Model.User;
import com.pcm.Model.UserRole;


public interface HomeService {
	
	//Signup User
	public User registerUser(User user, Set<UserRole> userRoles) throws Exception;

}
