 package com.pcm.Model;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "user")
public class User implements UserDetails {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@NotBlank(message = "Name field is required")
	@Size(min = 2, max = 30, message = "Min 2 and max 30 characters are allowed in name field")
	private String name;

	@Column(unique = true)
	@NotBlank(message = "Email address is required.")
	@Email(regexp = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
	private String email;

	@NotBlank(message = "Password is required.")
	private String password;
	
	private String image;
	
	@Valid
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private UserMobileNumber mobileNumber;
	
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private UserCountryName country;
	
	@JsonFormat(pattern = "dd-MM-yyyy")
	private String dateOfBirth;
	
	private String zodiacSign;
	
	@NotNull
	@AssertTrue(message = "Please accept our terms and conditions.")
	private boolean agreement;
	
	private boolean enabled;
	
	private Timestamp connectedWithUS;
	
	private Timestamp lastLogin;
	
	private int totalContacts;
	
	@Column(length = 500)
	private String description;
	
	private String website;
	
	@Valid
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private UserSocialLinks socialLinks;

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<UserRole> userRoles = new HashSet<>();

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Contact> contacts = new ArrayList<>();
	
	
	
	
	
	

	
	
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		Set<Authority> authorities = new HashSet<>();
		
		this.userRoles.forEach(userRoles -> {
			authorities.add(new Authority(userRoles.getRole().getRoleName()));
		});
		
		return authorities;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

}
