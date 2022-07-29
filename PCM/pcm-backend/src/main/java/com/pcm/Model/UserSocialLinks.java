package com.pcm.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;


@Data
@Entity
@Table(name = "user_social_links")
public class UserSocialLinks {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@org.hibernate.validator.constraints.URL(message = "Facebook URL is not a valid URL")
	private String facebook;
	
	@org.hibernate.validator.constraints.URL(message = "Twitter URL is not a valid URL")
	private String twitter;
	
	@org.hibernate.validator.constraints.URL(message = "LinkedIn URL is not a valid URL")
	private String linkedIn;
	
	@org.hibernate.validator.constraints.URL(message = "Instagram URL is not a valid URL")
	private String instagram;
	
	@org.hibernate.validator.constraints.URL(message = "YouTube URL is not a valid URL")
	private String youtube;
	
	@JsonIgnore
	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;
	
}
