package com.pcm.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pcm.Constant.ExceptionConstant;
import com.pcm.Model.User;
import com.pcm.Repository.UserRepository;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		System.out.println("User Details Service Impl -> USER EMAIL : " + username);
		User user = this.userRepository.findByUserName(username);
		
		if(user == null) {
			System.out.println("Sorry, we couldn't find an account with that email address");
			throw new UsernameNotFoundException(ExceptionConstant.USERNAME_NOT_FOUND);
		}
		
		return user;
	}

}
