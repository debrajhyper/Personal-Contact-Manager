package com.pcm.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "phone_no")
public class ContactPhoneNo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int phoneId;
	private String phoneType;
	@Column(unique = true)
	private String phoneNo;
	
	@JsonIgnore
	@ManyToOne
	private Contact contact;

	
	
	
	
	public ContactPhoneNo(int phoneId, String phoneType, String phoneNo, Contact contact) {
		super();
		this.phoneId = phoneId;
		this.phoneType = phoneType;
		this.phoneNo = phoneNo;
		this.contact = contact;
	}

	public ContactPhoneNo() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getPhoneId() {
		return phoneId;
	}

	public void setPhoneId(int phoneId) {
		this.phoneId = phoneId;
	}

	public String getPhoneType() {
		return phoneType;
	}

	public void setPhoneType(String phoneType) {
		this.phoneType = phoneType;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public Contact getContact() {
		return contact;
	}

	public void setContact(Contact contact) {
		this.contact = contact;
	}

}
