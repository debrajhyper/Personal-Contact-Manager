package com.pcm.Service.Impl;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.DateTimeException;
import java.time.format.DateTimeParseException;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.zip.DataFormatException;

import javax.persistence.EntityExistsException;
import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.pcm.Constant.AppConstant;
import com.pcm.Helper.DateValidator;
import com.pcm.Helper.ImageUploader;
import com.pcm.Model.User;
import com.pcm.Model.UserRole;
import com.pcm.Repository.RoleRepository;
import com.pcm.Repository.UserRepository;
import com.pcm.Service.UserService;


@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	
	@Override
	public void registerUser(User user, Set<UserRole> userRoles) throws Exception {
		try {
			User dbUser = this.userRepository.findByUserName(user.getEmail());

			if (dbUser != null) {
				throw new EntityExistsException("User already exists with this email address");
			} 
			else {
				System.out.println("USER AGREEMENT -> " + user.isAgreement());

				for (UserRole ur : userRoles) {
					this.roleRepository.save(ur.getRole());
				}

				Timestamp timestamp = new Timestamp(System.currentTimeMillis());
				
				user.setEnabled(true);
				user.setConnectedWithUS(timestamp);
				user.setLastLogin(timestamp);
				user.setTotalContacts(0);
				user.setImage(AppConstant.DEFAULT_IMAGE);
				user.getUserRoles().addAll(userRoles);

				this.userRepository.save(user);
				System.out.println("SUCCESS =================== > REGISTERED USER : " + user.getEmail());
			}
		} 
		catch (EntityExistsException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new EntityExistsException(e.getMessage());
		} 
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception("oops... Something went wrong");
		}
	}

	
	
	
	@Override
	public User currentUser(String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User sessionUser = this.userRepository.findByUserName(email);
			
			if(sessionUser == null) {
				throw new UsernameNotFoundException("No account is associated with this user");
			}

			String uriLocation = ServletUriComponentsBuilder.fromCurrentContextPath().path(AppConstant.GET_UPLOAD_LOCATION).path(sessionUser.getImage()).toUriString();
			sessionUser.setImage(uriLocation);
			sessionUser.setPassword(null);
			
			System.out.println("SUCCESS =================== > CRRENT USER : " + sessionUser.getEmail());
			
			return sessionUser;
		} 
		catch(UsernameNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new UsernameNotFoundException(e.getMessage());
		}
		catch (NoSuchElementException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new NoSuchElementException("No such user was found");
		} 
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception("oops... Something went wrong.");
		}
	}

	
	
	
	@Override
	public void updateUser(User user, MultipartFile profilePic, String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			System.out.println("UPDATING USER -> ID: " + user.getId() + " NAME: " + user.getName());

			User sessionUser = this.userRepository.findByUserName(email);
			System.out.println("DB USER ID -> " + sessionUser.getId());

			if ((Integer) sessionUser.getId() == (Integer) user.getId()) {
				System.out.println("PROFILE PIC DATA -> " + profilePic);
				new ImageUploader(profilePic).updateImage(sessionUser, user);

				if (user.getDateOfBirth() != null && !user.getDateOfBirth().isBlank()) {
					DateValidator validator = new DateValidator(AppConstant.DATE_FORMATER);
					boolean isvalidDate = validator.isValid(user.getDateOfBirth());
					System.out.println("IS BIRTH DATE VALID -> " + isvalidDate);
				}
				if (user.getMobileNumber() != null) {
					if (sessionUser.getMobileNumber() != null) {
						user.getMobileNumber().setId(sessionUser.getMobileNumber().getId());
					}
					user.getMobileNumber().setUser(sessionUser);
				}
				if (user.getCountry() != null) {
					if (sessionUser.getCountry() != null) {
						user.getCountry().setId(sessionUser.getCountry().getId());
					}
					user.getCountry().setUser(sessionUser);
				}
				if (user.getSocialLinks() != null) {
					if (sessionUser.getSocialLinks() != null) {
						user.getSocialLinks().setId(sessionUser.getSocialLinks().getId());
					}
					user.getSocialLinks().setUser(sessionUser);
				}
				user.setEnabled(true);
				user.setPassword(sessionUser.getPassword());
				user.setConnectedWithUS(sessionUser.getConnectedWithUS());
				user.setLastLogin(sessionUser.getLastLogin());
				user.setTotalContacts(sessionUser.getTotalContacts());

				this.userRepository.save(user);
				System.out.println("SUCCESS =================== >  UPDATED USER ID " + user.getId() + " -> " + user.getEmail());
			} 
			else {
				throw new UsernameNotFoundException("No account is associated with this user");
			}
		} 
		catch (UsernameNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new UsernameNotFoundException(e.getMessage());
		} 
		catch (ValidationException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new ValidationException(e.getMessage());
		} 
		catch (IOException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new IOException("Failed to upload image in specified location");
		} 
		catch (DateTimeParseException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new DateTimeException("Invalid date format");
		} 
		catch (DateTimeException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new DateTimeException(e.getMessage());
		} 
		catch (DataFormatException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new DataFormatException(e.getMessage());
		} 
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception("oops... Something went wrong");
		}
	}

	
	
	
	@Override
	public void logoutUser(String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User sessionUser = this.userRepository.findByUserName(email);
			
			if (sessionUser != null) {
				System.out.println("DB USER ID -> " + sessionUser.getId());

				Timestamp timestamp = new Timestamp(System.currentTimeMillis());
				sessionUser.setLastLogin(timestamp);
				this.userRepository.save(sessionUser);

				System.out.println("SUCCESS =================== > LOGOUT USER : " + sessionUser.getName());
			} 
			else {
				throw new UsernameNotFoundException("No account is associated with this user");
			}
		} 
		catch (UsernameNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new UsernameNotFoundException(e.getMessage());
		} 
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception("oops... Something went wrong");
		}
	}

}
