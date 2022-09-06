package com.pcm.Service;

import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

import com.pcm.Model.User;
import com.pcm.Model.UserRole;


public interface UserService {
	
	//CREATE USER
	public void registerUser(User user, Set<UserRole> userRoles) throws Exception;
	
	//READ USER
	public User currentUser(String email) throws Exception;
	
	//UPDATE USER
	public void updateUser(User user, MultipartFile profilePic, String email) throws Exception;
	
	//LOGOUT USER
	public void logoutUser(String email) throws Exception;

}
