package com.pcm.Service.Impl;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcm.Constant.DemoUserConstant;
import com.pcm.Constant.RoleConstant;
import com.pcm.Exception.ResourceNotFoundException;
import com.pcm.Helper.ImageUploader;
import com.pcm.Helper.LoadContactsFromCsv;
import com.pcm.Model.Contact;
import com.pcm.Model.Role;
import com.pcm.Model.User;
import com.pcm.Model.UserRole;
import com.pcm.Repository.UserRepository;
import com.pcm.Service.DemoUserService;
import com.pcm.Service.UserService;
import com.pcm.Service.Repository.UserRepositoryService;


@Service
public class DemoUserServiceImpl implements DemoUserService {

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserRepositoryService userRepositoryService;

	@Autowired
	private ContactServiceImpl contactServiceImpl;

	@Autowired
	private LoadContactsFromCsv loadContactsFromCsv;

	
	@Override
	public User createDemoUser() throws Exception {
		// TODO Auto-generated method stub
		User demoUser = new User();

		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		SimpleDateFormat dateFormat = new SimpleDateFormat(DemoUserConstant.DEMO_USER_TIME_FORMAT);
		String formattedTimestamp = dateFormat.format(timestamp);

		String formattedEmailString = DemoUserConstant.DEMO_USER_FORMATTED_EMAIL_PREFIX + formattedTimestamp
				+ DemoUserConstant.DEMO_USER_FORMATTED_EMAIL_SUFFIX;
		System.out.println("DEMO USER FINAL FORMATTER EMAIL -> " + formattedEmailString);

		demoUser.setName(DemoUserConstant.DEMO_USER_NAME);
		demoUser.setEmail(formattedEmailString);
		demoUser.setPassword(DemoUserConstant.DEMO_USER_PASSWORD);
		demoUser.setDescription(DemoUserConstant.DEMO_USER_ABOUT);
		demoUser.setEnabled(true);
		demoUser.setAgreement(true);

		Set<UserRole> roles = new HashSet<>();

		Role role = new Role();
		role.setRoleId(RoleConstant.DEMO_ROLE_ID);
		role.setRoleName(RoleConstant.DEMO_ROLE_NAME);

		UserRole userRole = new UserRole();
		userRole.setUser(demoUser);
		userRole.setRole(role);

		roles.add(userRole);

		this.userService.registerUser(demoUser, roles);

		List<Contact> demoContacts = loadContactsFromCsv.getContacts();
		if (demoContacts != null) {
			for (Contact contact : demoContacts) {
				// Print the name of each contact
				this.contactServiceImpl.addContact(contact, null, formattedEmailString);
				System.out.println("DEMO USER ADD DEFAULT CONTACT : " + contact.getName());
			}
		}
		
		System.out.println("SUCCESS =================== > CREATED DEMO USER -> EMAIL : " + demoUser.getEmail());
		return demoUser;
	}

	
	@Override
	public void removeDemotUserWithSession(String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User sessionUser = this.userRepositoryService.findByUserName(email);
			System.out.println("DB USER -> ID : " + sessionUser.getId());

			if (sessionUser.getEmail().equals(email)) {
				removeDemotUser(sessionUser);
				System.out.println("SUCCESS =================== > DEMO USER REMOVED SUCCESSFULLY -> EMAIL : " + sessionUser.getEmail());
			} else {
				throw new ResourceNotFoundException("The user is not a demo user");
			}
		} catch (ResourceNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new ResourceNotFoundException(e.getMessage());
		}
	}
	
	
	private void removeDemotUser(User demoUser) throws IOException {
		for (Contact contact : demoUser.getContacts()) {
			new ImageUploader().deleteImage(contact);
		}
		this.userRepository.delete(demoUser);
	}
	
	
	@Override
	public void scheduleRemoveDemoUser() throws Exception {
		// TODO Auto-generated method stub
		Timestamp tenDaysAgoDate = Timestamp.valueOf(LocalDateTime.now().minusDays(DemoUserConstant.DEMO_USER_FROM_PAST_DAYS));
		System.out.println("DEMO USER CLEARING DATE -----> " + tenDaysAgoDate);
		
		List<User> allDemoUsersCreatedTenDaysAgo = this.userRepository.findAllDemoUsersCreatedBefore(tenDaysAgoDate);
		System.out.println("TOTAL DEMO USERS TO REMOVE -----> " + allDemoUsersCreatedTenDaysAgo.size());
		
		if(allDemoUsersCreatedTenDaysAgo.isEmpty()) {
			System.out.println("=========================>  NO DEMO USERS IN LAST " + DemoUserConstant.DEMO_USER_FROM_PAST_DAYS + " DAYS");
		} else {
			System.out.println("=========================>  REMOVEING ALL DEMO USERS > " + DemoUserConstant.DEMO_USER_FROM_PAST_DAYS + " DAYS\n");
			for(User demoUser: allDemoUsersCreatedTenDaysAgo) {
				removeDemotUser(demoUser);
				System.out.println("DEMO USER REMOVED -> " + demoUser.getName() + " -> " + demoUser.getEmail() + " -> " + demoUser.getConnectedWithUS() + "\n");
			}
		}
	}
	
}
