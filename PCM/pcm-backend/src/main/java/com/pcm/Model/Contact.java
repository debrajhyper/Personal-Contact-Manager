package com.pcm.Model;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "contact")
public class Contact {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int cId;
	private String image;
	private String name;
	private String nickName;
	private String companyName;
	private String title;
	private String work;
	private String emailType;
	
	@Column(unique = true)
	@Email(regexp = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
	private String email;
	
	@OneToMany(mappedBy = "contact", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<ContactPhoneNo> phoneNo = new ArrayList<>();
	
	private String addressType;
	private String address;
	private String website;
	private String birthday;
	private String anniversary;
	private String relationship;
	private Timestamp date;
	
	@Column(length = 9000)
	private String description;

	@JsonIgnore
	@ManyToOne
	private User user;

	
	
	
	
	public Contact(int cId, String image, String name, String nickName, String companyName, String title, String work,
			String emailType, @Email(regexp = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$") String email,
			List<ContactPhoneNo> phoneNo, String addressType, String address, String website, String birthday,
			String anniversary, String relationship, Timestamp date, String description, User user) {
		super();
		this.cId = cId;
		this.image = image;
		this.name = name;
		this.nickName = nickName;
		this.companyName = companyName;
		this.title = title;
		this.work = work;
		this.emailType = emailType;
		this.email = email;
		this.phoneNo = phoneNo;
		this.addressType = addressType;
		this.address = address;
		this.website = website;
		this.birthday = birthday;
		this.anniversary = anniversary;
		this.relationship = relationship;
		this.date = date;
		this.description = description;
		this.user = user;
	}

	public Contact() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getcId() {
		return cId;
	}

	public void setcId(int cId) {
		this.cId = cId;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getWork() {
		return work;
	}

	public void setWork(String work) {
		this.work = work;
	}

	public String getEmailType() {
		return emailType;
	}

	public void setEmailType(String emailType) {
		this.emailType = emailType;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<ContactPhoneNo> getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(List<ContactPhoneNo> phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getAddressType() {
		return addressType;
	}

	public void setAddressType(String addressType) {
		this.addressType = addressType;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getAnniversary() {
		return anniversary;
	}

	public void setAnniversary(String anniversary) {
		this.anniversary = anniversary;
	}

	public String getRelationship() {
		return relationship;
	}

	public void setRelationship(String relationship) {
		this.relationship = relationship;
	}

	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
