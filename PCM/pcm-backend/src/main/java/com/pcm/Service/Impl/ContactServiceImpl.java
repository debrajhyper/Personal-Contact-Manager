package com.pcm.Service.Impl;

import java.io.IOException;
import java.time.DateTimeException;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.ListIterator;
import java.util.NoSuchElementException;
import java.util.zip.DataFormatException;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.pcm.Constant.AppConstant;
import com.pcm.Exception.ResourceNotFoundException;
import com.pcm.Helper.DateValidator;
import com.pcm.Helper.ImageUploader;
import com.pcm.Model.Contact;
import com.pcm.Model.User;
import com.pcm.Repository.ContactRepository;
import com.pcm.Repository.UserRepository;
import com.pcm.Service.ContactService;


@Service
public class ContactServiceImpl implements ContactService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ContactRepository contactRepository;
	

	
	
	@Override
	public void addContact(Contact contact, MultipartFile profilePic, String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User sessionUser = this.userRepository.findByUserName(email);
			System.out.println("DB USER -> " + sessionUser.getEmail());
			
			List<Contact> contactsByUser = this.contactRepository.findContactsByUser(sessionUser.getId());
			ListIterator<Contact> iterateContactList = contactsByUser.listIterator();
			while(iterateContactList.hasNext()) {
				if(iterateContactList.next().getEmail().equals(contact.getEmail())) {
					throw new DuplicateKeyException("Contact already exist.");
				}
			}
			
			System.out.println("PROFILE PIC DATA -> " + profilePic);
			new ImageUploader(profilePic).uploadImage(contact);
			
			
			if(contact.getDateOfBirth() != null && !contact.getDateOfBirth().isBlank()) {
				DateValidator validator = new DateValidator(AppConstant.DATE_FORMATER);
				boolean isvalidDate = validator.isValid(contact.getDateOfBirth());
				System.out.println("IS BIRTH DATE VALID -> " + isvalidDate);
			}
			if(contact.getMobileNumber() != null) {
//			contact.getMobileNumber().forEach(mobileNumber -> mobileNumber.setContact(contact));
				contact.getMobileNumber().setContact(contact);
			}
			if(contact.getTelephoneNumber() != null) {
				contact.getTelephoneNumber().setContact(contact);
			}
			if(contact.getCountry() != null) {
				contact.getCountry().setContact(contact);
			}
			if(contact.getSocialLinks() != null) {
				contact.getSocialLinks().setContact(contact);
			}
			
			contact.setUser(sessionUser);
			sessionUser.getContacts().add(contact);
			sessionUser.setTotalContacts(sessionUser.getTotalContacts() + 1);
			
			User savedUserContact = this.userRepository.save(sessionUser);
			System.out.println("SUCCESS =================== >  SAVED CONTACT ID " + contact.getCId() + " -> " + contact.getEmail() + " FOR USER -> " + savedUserContact.getEmail());
		} 
		catch (DuplicateKeyException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new DuplicateKeyException(e.getMessage());
		}
		catch(ValidationException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new ValidationException(e.getMessage());
		}
		catch (IOException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new IOException("Failed to upload image in specified location.");
		}
		catch (DateTimeParseException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new DateTimeException("Invalid Date Format");
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
			throw new Exception("Oops... Something went wrong.");
		}
	}


	
	
	@Override
	public List<Contact> getAllContacts(String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User sessionUser = this.userRepository.findByUserName(email);
			List<Contact> contacts = this.contactRepository.findContactsByUser(sessionUser.getId());
			
			System.out.println("SUCCESS =================== > VIEW ALL CONTACTS SEND SUCCESSFULLY");
			return contacts;			
		} 
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception("Oops... Something went wrong.");
		}
	}


	
	
	@Override
	public Page<Contact> viewContacts(Integer page, String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User sessionUser = this.userRepository.findByUserName(email);
			
			//pagination
			Pageable pageable = PageRequest.of(page, 10);
			Page<Contact> contacts = this.contactRepository.findContactsByUser(sessionUser.getId(), pageable);
			System.out.println("TOTAL CONTACTS FOR PAGE " + page + " -> " + contacts.getNumberOfElements());
			
			if(contacts.isEmpty()) {
				throw new ResourceNotFoundException("No more available contacts.");
			}
			else {
				contacts.forEach(
						contact -> contact.setImage(
										ServletUriComponentsBuilder.fromCurrentContextPath().path(AppConstant.GET_UPLOAD_LOCATION).path(contact.getImage()).toUriString()
									)
							);
				System.out.println("SUCCESS =================== > VIEW CONTACTS FOR PAGE " + page + " SEND SUCCESSFULLY");
				
				return contacts;				
			}
		} 
		catch (ResourceNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new ResourceNotFoundException(e.getMessage());
		}
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception("Oops... Something went wrong.");
		}
	}

	

	
	@Override
	public Contact viewContact(Integer cId, String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User sessionUser = this.userRepository.findByUserName(email);
			Contact contact = this.contactRepository.findById(cId).get();
			
			if(sessionUser.getId() == contact.getUser().getId()) {
				String uriLocation = ServletUriComponentsBuilder.fromCurrentContextPath().path(AppConstant.GET_UPLOAD_LOCATION).path(contact.getImage()).toUriString();
				contact.setImage(uriLocation);
				
				System.out.println("SUCCESS =================== > VIEW CONTACT PROFILE DETAILS SEND SUCCESSFULLY");
				return contact;
			}
			else {
				throw new ResourceNotFoundException("Contact does not belongs to the user.");
			}
		} 
		catch (ResourceNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new ResourceNotFoundException(e.getMessage());
		}
		catch (NoSuchElementException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new NoSuchElementException("No such contact found.");
		}
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception("Oops... Something went wrong.");
		}
	}	




	@Override
	public void deleteSelectedContacts(List<Integer> deleteIds, String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			List<Contact> contacts = new ArrayList<Contact>();
			List<Integer> contactIds = new ArrayList<>();
			List<Integer> userIds = new ArrayList<>();
			User sessionUser = this.userRepository.findByUserName(email);
			
			System.out.println("DELETE IDs -> " + deleteIds);
			
			deleteIds.forEach(cId -> {
				Contact contact = this.contactRepository.findById(cId).get();
				contacts.add(contact);
			});
			
			contacts.forEach(contact -> {
				contactIds.add(contact.getCId());
				userIds.add(contact.getUser().getId());
			});

			System.out.println("DELETE CONTACT IDs -> " + contactIds);
			System.out.println("RESPECTIVE USER IDs -> " + userIds);
		
			boolean sessionUserEqualsUserIds = Collections.frequency(userIds, sessionUser.getId()) == userIds.size();
			System.out.println("SESSION USER == CONTACT USER IDS -> " + sessionUserEqualsUserIds);
			
			if(sessionUserEqualsUserIds) {
				User user = this.userRepository.findByUserName(email);
				System.out.println("BEFORE DELETE : TOTAL USER CONTACTS -> " + user.getTotalContacts());
				
				System.out.println("TOTAL NUMBER OF CONTACTS WILL BE DELETED -> " + deleteIds.size());
				contacts.forEach(contact -> {
					try {
						new ImageUploader().deleteImage(contact);
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					this.contactRepository.delete(contact);
				});
				
				user.setTotalContacts(user.getTotalContacts() - deleteIds.size());
				this.userRepository.save(user);
				
				System.out.println("AFTER DELETE : TOTAL USER CONTACTS -> " + user.getTotalContacts());
				System.out.println("SUCCESS =================== > SELECTED CONTACTS DELETED SUCCESSFULLY");
			} 
			else {
				throw new ResourceNotFoundException("Contacts does not belongs to this User.");
			}
		} 
		catch (ResourceNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new ResourceNotFoundException(e.getMessage());
		}
		catch (NoSuchElementException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new NoSuchElementException("No such contact found.");
		}
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception("Problem while deleting selected Contacts.");
		}
	}
	
	
	
	
	@Override
	public void deleteContact(Integer cId, String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User sessionUser = this.userRepository.findByUserName(email);
			Contact contact = this.contactRepository.findById(cId).get();				
			
			if(sessionUser.getId() == contact.getUser().getId()) {
				User user = this.userRepository.findByUserName(email);
				System.out.println("BEFORE DELETE : TOTAL USER CONTACTS -> " + user.getTotalContacts());
				
				new ImageUploader().deleteImage(contact);
				this.contactRepository.delete(contact);
				
				user.setTotalContacts(user.getTotalContacts() - 1);
				this.userRepository.save(user);
				
				System.out.println("AFTER DELETE : TOTAL USER CONTACTS -> " + user.getTotalContacts());
				System.out.println("SUCCESS =================== > CONTACT DELETED SUCCESSFULLY");
			} 
			else {
				throw new ResourceNotFoundException("Contact does not belongs to this User.");
			}
		} 
		catch (ResourceNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new ResourceNotFoundException(e.getMessage());
		}
		catch (NoSuchElementException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new NoSuchElementException("No such contact found.");
		}
		catch (IOException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
//			throw new IOException("Failed to delete image for this contact.");
		}
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception("Problem while deleting this Contact.");
		}
	}




	@Override
	public void updateContact(Contact contact, MultipartFile profilePic, String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			System.out.println("UPDATING CONTACT -> ID: " + contact.getCId() + " NAME: " + contact.getName());
			
			User sessionUser = this.userRepository.findByUserName(email);
			System.out.println("DB USER -> " + sessionUser.getEmail());
			
			Contact oldContact = this.contactRepository.findById(contact.getCId()).get();
			
			System.out.println("PROFILE PIC DATA -> " + profilePic);
			new ImageUploader(profilePic).updateImage(oldContact, contact);
			
			if(contact.getDateOfBirth() != null && !contact.getDateOfBirth().isBlank()) {
				DateValidator validator = new DateValidator(AppConstant.DATE_FORMATER);
				boolean isvalidDate = validator.isValid(contact.getDateOfBirth());
				System.out.println("IS BIRTH DATE VALID -> " + isvalidDate);
			}
			if(contact.getMobileNumber() != null) {
				if(oldContact.getMobileNumber() != null) {					
					contact.getMobileNumber().setId(oldContact.getMobileNumber().getId());
				}
				contact.getMobileNumber().setContact(oldContact);
			}
			if(contact.getTelephoneNumber() != null) {
				if(oldContact.getTelephoneNumber() != null) {					
					contact.getTelephoneNumber().setId(oldContact.getTelephoneNumber().getId());
				}
				contact.getTelephoneNumber().setContact(oldContact);
			}
			if(contact.getCountry() != null) {
				if(oldContact.getCountry() != null) {					
					contact.getCountry().setId(oldContact.getCountry().getId());
				}
				contact.getCountry().setContact(oldContact);
			}
			if(contact.getSocialLinks() != null) {
				if(oldContact.getSocialLinks() != null) {					
					contact.getSocialLinks().setId(oldContact.getSocialLinks().getId());
				}
				contact.getSocialLinks().setContact(oldContact);
			}
			
			contact.setUser(sessionUser);
			Contact updatedContact = this.contactRepository.save(contact);
			
			System.out.println("SUCCESS =================== >  UPDATED CONTACT ID " + updatedContact.getCId() + " -> " + updatedContact.getEmail() + " FOR USER -> " + updatedContact.getUser().getEmail());
		} 
		catch(ValidationException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new ValidationException(e.getMessage());
		}
		catch (IOException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new IOException("Failed to upload image in specified location.");
		}
		catch (DateTimeParseException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new DateTimeException("Invalid Date Format");
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
			throw new Exception("Oops... Something went wrong.");
		}
		
	}


}