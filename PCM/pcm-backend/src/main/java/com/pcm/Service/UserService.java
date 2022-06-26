package com.pcm.Service;

import java.util.Set;

import com.pcm.Model.User;
import com.pcm.Model.UserRole;


public interface UserService {
	
	//USER SIGNUP
	public User registerUser(User user, Set<UserRole> userRoles) throws Exception;
	
	//CURRENT USER
	public User currentUser(String email) throws Exception;

}
