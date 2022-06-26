package com.pcm.Service.Impl;

import java.sql.Timestamp;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcm.Config.UserDetailsServiceImpl;
import com.pcm.Model.User;
import com.pcm.Model.UserRole;
import com.pcm.Repository.RoleRepository;
import com.pcm.Repository.UserRepository;
import com.pcm.Service.UserService;


@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	

	//USER SIGNUP
	@Override
	public User registerUser(User user, Set<UserRole> userRoles) throws Exception {
		
		User dbUser =  this.userRepository.findByUserName(user.getEmail());
		
		if(dbUser != null) {
			System.out.println("User Already exists........");
			throw new IllegalArgumentException("User already exists with this email id");
		}
		else {
			System.out.println("Agreement -> " + user.isAgreement());
			
			for(UserRole ur : userRoles) {
				this.roleRepository.save(ur.getRole());
			}
			
			user.setEnabled(true);
			Timestamp timestamp = new Timestamp(System.currentTimeMillis());
			user.setConnectedWithUS(timestamp);
			user.setLastLogin(timestamp);
			user.setTotalContacts(0);
			user.setImage("default.png");
			user.getUserRoles().addAll(userRoles);
			
			User save = this.userRepository.save(user);
			System.out.println("REGISTERED USER -> " + user.getEmail());
			
			return save;
		}
	}


	//CURRENT USER
	@Override
	public User currentUser(String email) throws Exception {
		// TODO Auto-generated method stub
		User currentUser = (User) this.userDetailsServiceImpl.loadUserByUsername(email);
		currentUser.setPassword(null);
		
		return currentUser;
	}

}
