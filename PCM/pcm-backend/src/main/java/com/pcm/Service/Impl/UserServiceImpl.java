package com.pcm.Service.Impl;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.DateTimeException;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.zip.DataFormatException;

import javax.persistence.EntityExistsException;
import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pcm.Constant.AppConstant;
import com.pcm.Constant.ExceptionConstant;
import com.pcm.Helper.DateValidator;
import com.pcm.Helper.ImageUploader;
import com.pcm.Helper.UriLocation;
import com.pcm.Model.Contact;
import com.pcm.Model.User;
import com.pcm.Model.UserRole;
import com.pcm.Properties.FileServerProperties;
import com.pcm.Repository.RoleRepository;
import com.pcm.Repository.UserRepository;
import com.pcm.Service.UserService;
import com.pcm.Service.Repository.ContactRepositoryService;
import com.pcm.Service.Repository.UserRepositoryService;


@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepositoryService userRepositoryService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private ContactRepositoryService contactRepositoryService;
	
	@Autowired
	private UriLocation uriLocation;
	
	@Autowired
	private FileServerProperties fileServerProperties;
	
	@Autowired
	private ImageUploader imageUploader;
	
	
	@Override
	public void registerUser(User user, Set<UserRole> userRoles) throws Exception {
		try {
			User dbUser = this.userRepository.findByUserName(user.getEmail());

			if (dbUser != null) {
				throw new EntityExistsException("User already exists with this email address");
			} 
			else {
				System.out.println("USER AGREEMENT -> " + user.isAgreement());

				for (UserRole userRole : userRoles) {
					this.roleRepository.save(userRole.getRole());
				}

				Timestamp timestamp = new Timestamp(System.currentTimeMillis());
				
				user.setEnabled(true);
				user.setConnectedWithUS(timestamp);
				user.setLastLogin(timestamp);
				user.setTotalContacts(0);
				user.setImage(AppConstant.DEFAULT_IMAGE);
				user.setImageUUID(this.fileServerProperties.getDefaultUuid());
				user.getUserRoles().addAll(userRoles);

				this.userRepository.save(user);
				System.out.println("SUCCESS =================== > REGISTERED USER -> EMAIL : " + user.getEmail());
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
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}

	
	
	
	@Override
	public User currentUser(String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User sessionUser = this.userRepositoryService.findByUserName(email);
			System.out.println("DB USER -> ID : " + sessionUser.getId());
			
			List<Contact> contacts = this.contactRepositoryService.findContactsByUser(sessionUser.getId());
			System.out.println("TOTAL CONTACTS -> " + contacts.size());
			
			String uriLocation = this.uriLocation.getFileServerLocation(sessionUser);
			sessionUser.setImage(uriLocation);
			sessionUser.setPassword(null);
			sessionUser.setTotalContacts(contacts.size());
			
			System.out.println("SUCCESS =================== > CRRENT USER -> EMAIL : " + sessionUser.getEmail());
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
			throw new NoSuchElementException("The user does not exist");
		} 
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}

	
	
	
	@Override
	public void updateUser(User user, MultipartFile profilePic, String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			System.out.println("UPDATING USER -> ID: " + user.getId() + " NAME: " + user.getName());

			User sessionUser = this.userRepositoryService.findByUserName(email);
			System.out.println("DB USER -> ID : " + sessionUser.getId());

			if ((Integer) sessionUser.getId() == (Integer) user.getId()) {
				System.out.println("PROFILE PIC DATA -> " + profilePic);
				this.imageUploader.ImageUploaderProfilePic(profilePic);
				this.imageUploader.updateImage(sessionUser, user);

				if (user.getDateOfBirth() != null && !user.getDateOfBirth().isEmpty()) {
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
				System.out.println("SUCCESS =================== >  UPDATED USER -> EMAIL : " + user.getEmail());
			} 
			else {
				throw new UsernameNotFoundException(ExceptionConstant.USERNAME_NOT_FOUND);
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
			throw new IOException("Image failed to upload to the server");
		} 
		catch (DateTimeParseException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new DateTimeException("An invalid date format has been entered");
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
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}

	
	
	
	@Override
	public void logoutUser(String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User sessionUser = this.userRepositoryService.findByUserName(email);
			System.out.println("DB USER -> ID : " + sessionUser.getId());

			Timestamp timestamp = new Timestamp(System.currentTimeMillis());
			sessionUser.setLastLogin(timestamp);
			
			this.userRepository.save(sessionUser);
			System.out.println("SUCCESS =================== > LOGOUT USER -> EMAIL : " + sessionUser.getEmail());
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
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}

}
