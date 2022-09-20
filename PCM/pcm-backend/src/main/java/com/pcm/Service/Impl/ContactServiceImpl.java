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
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pcm.Constant.AppConstant;
import com.pcm.Constant.ExceptionConstant;
import com.pcm.Exception.ResourceNotFoundException;
import com.pcm.Helper.DateValidator;
import com.pcm.Helper.ImageUploader;
import com.pcm.Helper.UriLocation;
import com.pcm.Model.Contact;
import com.pcm.Model.User;
import com.pcm.Repository.ContactRepository;
import com.pcm.Repository.UserRepository;
import com.pcm.Service.ContactService;
import com.pcm.Service.Repository.ContactRepositoryService;
import com.pcm.Service.Repository.UserRepositoryService;


@Service
public class ContactServiceImpl implements ContactService {
	
	@Autowired
	private UserRepositoryService userRepositoryService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ContactRepositoryService contactRepositoryService;
	
	@Autowired
	private ContactRepository contactRepository;
	
	@Autowired
	private UriLocation uriLocation;
	
	
	@Override
	public void addContact(Contact contact, MultipartFile profilePic, String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User sessionUser = this.userRepositoryService.findByUserName(email);
			System.out.println("DB USER -> ID : " + sessionUser.getId());
			
			List<Contact> contactsByUser = this.contactRepositoryService.findContactsByUser(sessionUser.getId());
			ListIterator<Contact> iterateContactList = contactsByUser.listIterator();
			while(iterateContactList.hasNext()) {
				if(iterateContactList.next().getEmail().equals(contact.getEmail())) {
					throw new DuplicateKeyException("Email address already belongs to a contact");
				}
			}
			
			System.out.println("PROFILE PIC DATA -> " + profilePic);
			new ImageUploader(profilePic).uploadImage(contact);
			
			if(contact.getDateOfBirth() != null && !contact.getDateOfBirth().isEmpty()) {
				DateValidator validator = new DateValidator(AppConstant.DATE_FORMATER);
				boolean isvalidDate = validator.isValid(contact.getDateOfBirth());
				System.out.println("IS BIRTH DATE VALID -> " + isvalidDate);
			}
			if(contact.getMobileNumber() != null) {
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
			System.out.println("SUCCESS =================== >  SAVED CONTACT -> ID : " + contact.getCId() + ", EMAIL : " + contact.getEmail() + ", FOR USER : " + savedUserContact.getEmail());
		} 
		catch(UsernameNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new UsernameNotFoundException(e.getMessage());
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
	public List<Contact> getAllContacts(String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User sessionUser = this.userRepositoryService.findByUserName(email);
			System.out.println("DB USER -> ID : " + sessionUser.getId());
			
			List<Contact> contacts = this.contactRepositoryService.findContactsByUser(sessionUser.getId());
			
			System.out.println("SUCCESS =================== > VIEW ALL CONTACTS SEND SUCCESSFULLY");
			return contacts;			
		} 
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}


	
	
	@Override
	public Page<Contact> viewContacts(Integer page, String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User sessionUser = this.userRepositoryService.findByUserName(email);
			System.out.println("DB USER -> ID : " + sessionUser.getId());
			
			//PAGINATION
			Pageable pageable = PageRequest.of(page, 10);
			System.out.println("PAGEABLE -> " + pageable);
			
			Page<Contact> contacts = this.contactRepositoryService.findContactsByUser(sessionUser.getId(), pageable);
			System.out.println("TOTAL CONTACTS FOR PAGE " + page + " -> " + contacts.getNumberOfElements());
			
			contacts.forEach(
					contact -> contact.setImage(
									this.uriLocation.getUploadcareLocation(contact)
								)
						);
			
			System.out.println("SUCCESS =================== > VIEW CONTACTS -> FOR PAGE : " + page + " SEND SUCCESSFULLY");
			return contacts;				
		} 
		catch(UsernameNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new UsernameNotFoundException(e.getMessage());
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
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}

	

	
	@Override
	public Contact viewContact(Integer cId, String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User sessionUser = this.userRepositoryService.findByUserName(email);
			System.out.println("DB USER -> ID : " + sessionUser.getId());
			
			Contact contact = this.contactRepository.findById(cId).get();
			System.out.println("DB CONTACT -> ID : " + contact.getCId());
			
			if(sessionUser.getId() == contact.getUser().getId()) {
				String uriLocation = this.uriLocation.getUploadcareLocation(contact);
				contact.setImage(uriLocation);
				
				System.out.println("SUCCESS =================== > VIEW CONTACT PROFILE DETAILS SEND SUCCESSFULLY");
				return contact;
			}
			else {
				throw new ResourceNotFoundException("The contact does not belong to the user");
			}
		} 
		catch(UsernameNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new UsernameNotFoundException(e.getMessage());
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
			throw new NoSuchElementException("The contact does not exist");
		}
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}	




	@Override
	public void deleteSelectedContacts(List<Integer> deleteIds, String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			List<Contact> contacts = new ArrayList<Contact>();
			List<Integer> contactIds = new ArrayList<>();
			List<Integer> userIds = new ArrayList<>();
			
			System.out.println("DELETE IDs -> " + deleteIds);
			
			User sessionUser = this.userRepositoryService.findByUserName(email);
			System.out.println("DB USER -> ID : " + sessionUser.getId());		
			
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
				System.out.println("BEFORE DELETE -> TOTAL USER CONTACTS : " + sessionUser.getTotalContacts());
				
				System.out.println("TOTAL NUMBER OF CONTACTS WILL BE DELETED -> " + deleteIds.size());
				contacts.forEach(contact -> {
							try {
								new ImageUploader().deleteImage(contact);
							} 
							catch (IOException e) {
								// TODO Auto-generated catch block
								System.out.println("ERROR -> " + e.getMessage());
								e.printStackTrace();
							}
							this.contactRepository.delete(contact);
				});
				
				sessionUser.setTotalContacts(sessionUser.getTotalContacts() - deleteIds.size());
				this.userRepository.save(sessionUser);
				
				System.out.println("AFTER DELETE -> TOTAL USER CONTACTS : " + sessionUser.getTotalContacts());
				System.out.println("SUCCESS =================== > SELECTED CONTACTS DELETED SUCCESSFULLY");
			} 
			else {
				throw new ResourceNotFoundException("The contact does not belong to the user");
			}
		} 
		catch(UsernameNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new UsernameNotFoundException(e.getMessage());
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
			throw new NoSuchElementException("The contact does not exist");
		}
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception("Problem while deleting selected Contacts");
		}
	}
	
	
	
	
	@Override
	public void deleteContact(Integer cId, String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User sessionUser = this.userRepositoryService.findByUserName(email);
			System.out.println("DB USER -> ID : " + sessionUser.getId());	
			
			Contact contact = this.contactRepository.findById(cId).get();	
			System.out.println("DB CONTACT -> ID : " + contact.getCId());
			
			if(sessionUser.getId() == contact.getUser().getId()) {
				System.out.println("BEFORE DELETE -> TOTAL USER CONTACTS -: " + sessionUser.getTotalContacts());
				
				new ImageUploader().deleteImage(contact);
				this.contactRepository.delete(contact);
				
				sessionUser.setTotalContacts(sessionUser.getTotalContacts() - 1);
				this.userRepository.save(sessionUser);
				
				System.out.println("AFTER DELETE -> TOTAL USER CONTACTS -: " + sessionUser.getTotalContacts());
				System.out.println("SUCCESS =================== > CONTACT DELETED SUCCESSFULLY");
			} 
			else {
				throw new ResourceNotFoundException("The contact does not belong to the user");
			}
		} 
		catch(UsernameNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new UsernameNotFoundException(e.getMessage());
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
			throw new NoSuchElementException("The contact does not exist");
		}
		catch (IOException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new IOException("Failed to delete image for this contact");
		}
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception("Problem while deleting this Contact");
		}
	}




	@Override
	public void updateContact(Contact contact, MultipartFile profilePic, String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			System.out.println("UPDATING CONTACT -> ID : " + contact.getCId() + ", NAME : " + contact.getName());
			
			User sessionUser = this.userRepositoryService.findByUserName(email);
			System.out.println("DB USER -> ID : " + sessionUser.getId());
			
			Contact oldContact = this.contactRepository.findById(contact.getCId()).get();
			System.out.println("DB CONTACT -> ID : " + oldContact.getCId());
			
			System.out.println("PROFILE PIC DATA -> " + profilePic);
			new ImageUploader(profilePic).updateImage(oldContact, contact);
			
			if(contact.getDateOfBirth() != null && !contact.getDateOfBirth().isEmpty()) {
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
			
			System.out.println("SUCCESS =================== >  UPDATED CONTACT -> ID : " + updatedContact.getCId() + ", EMAIL : " + updatedContact.getEmail() + ", FOR USER : " + updatedContact.getUser().getEmail());
		} 
		catch(UsernameNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new UsernameNotFoundException(e.getMessage());
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


}