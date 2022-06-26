package com.pcm.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pcm.Model.User;
import com.pcm.Repository.UserRepository;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		System.out.println("User Details Service Impl - username -> " + username);
		User user = this.userRepository.findByUserName(username);
		
		if(user == null) {
			System.out.println("User Not Found");
			throw new UsernameNotFoundException("No User found");
		}
		
		return user;
	}

}
