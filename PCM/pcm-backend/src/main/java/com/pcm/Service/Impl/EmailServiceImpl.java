package com.pcm.Service.Impl;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Service;

import com.pcm.Constant.AppConstant;
import com.pcm.Service.EmailService;


@Service
public class EmailServiceImpl implements EmailService {
	
	private static final String EMAIL_SUBJECT = "Verify your email on PCM";
	private String userName;
	private String email;
	private String generatedOTP;	
	
	
	
	
	@Override
	public void setDetails(String userName, String email, String generatedOTP) {
		// TODO Auto-generated method stub
		this.userName = userName;
		this.email = email;
		this.generatedOTP = generatedOTP;
	}
	
	
	
	
	public String setEmailBody(String userName, String generatedOTP) {
		String EMAIL_BODY = "<div style='padding:1em 0;'>"
				+ "<div class='mail' style='height: 100%; width:93%; max-width:550px; overflow: auto; padding: 5% 4% 2%; margin:0 auto; background:#f2f1f1; border-radius:5px; font-size:1rem; font-weight:400; line-height:1.5; color:#415860;'>"
				+ 	"<div style='margin-bottom:5%; color:#415860;'>"
				+		"<h3 style='margin: 0; margin-top:0; font-size:2rem; font-weight:800; line-height:1.2;'>Personal Contact Manager</h3>"
				+	"</div>"
				+	"<div style='border: 1px solid #d9d9d9; border-radius: 5px; padding: 5%; background:#ffffff; color:#415860;'>"
				+		"<h4 style='margin-bottom: 3%; margin-top:0; font-size:1.5rem; font-weight:400; color:#415860;'>Hello "+ userName +",</h4>"
				+		"<h6 style='padding: 2% 0; font-weight:bold; margin:0 0 .5rem; font-size:1rem; font-weight:800; color:#415860; line-height:1.2;'>A request as been received to change the password for your personal contact manager account.</h6>"
				+		"<div style='text-align:center; margin-bottom: 10%;'>"
				+			"<p style='margin-top:2em; color:#415860;'>Use the following OTP to complete your Login procedures.</p>"
				+			"<h1 style='margin-top:0; font-weight:800; letter-spacing: .2em; font-size:2.5rem; margin-bottom:.2em; color:#415860;'>"+ generatedOTP +"</h1>"
				+			"<p style='margin-top:0; font-size:1rem; color:#415860;'>OTP is valid for 5 minutes.</p>"
				+		"</div>"
				+		"<p style='padding: 2% 0; margin-top:0; font-size:1em; font-weight400; line-height:1.5; color:#415860;'>"
				+			"If you did not initiate this request, please contact us immediately at "
				+			"<a href='projectnotification2021@gmail.com'>projectnotification2021@gmail.com</a>"
				+		"</p>"
				+		"<div style='margin-top: 6%; font-size: 1rem; color: #17a395;'>"
				+			"<p style='margin:0;'>Thank You,</p>"
				+			"<p style='margin:0;'>Debraj Karmakar</p>"
				+		"</div>"
				+	"</div>"
				+	"<div style='text-align: center; margin-top: 10%;'>"
				+		"<div style='margin-top:5%; color:#415860;'>"
				+			"<h3 style='margin: 0; color:#415860; font-size:2rem; font-weight:800;'>PCM</h3>"
				+			"<h6 style='margin:0 0 5%; font-size:.8rem; color:#415860;'>Send with Confidence</h6>"
				+		"</div>"
				+		"<p style='color: #b0b0b0;'>© Personal Contact manager inc. 2021 &#10084; India</p>"
				+	"</div>"
				+ "</div>"
				+"</div>";
		
		return EMAIL_BODY;
	}
	
	
	
	
	@Override
	public boolean sendEmail() throws Exception {
		// TODO Auto-generated method stub
		boolean f = false;
		
		String from = AppConstant.PCM_EMAIL_ID;
		//variable for gMail host
		String host = "smtp.gmail.com";
		
		
		
		//get the system properties
		Properties properties = System.getProperties();
		/* System.out.println("PROPERTIES -> " + properties); */
		
		//setting imp info to properties object
		//host set [key, value]
		properties.put("mail.smtp.host", host);
		properties.put("mail.smtp.post", "465"); //google gmail port
		properties.put("mail.smtp.ssl.enable", "true"); //ssl enale
		properties.put("mail.smtp.auth", "true"); //auth true
		
		
		
		//step 1: to get the session object
		Session session = Session.getInstance(properties, new Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				// TODO Auto-generated method stub
				return new PasswordAuthentication(AppConstant.PCM_EMAIL_ID, AppConstant.PCM_EMAIL_PASS);
			}
		});
		
		/* session.setDebug(true); */
		
		//step 2: compose the message [text, Multimedia]
		MimeMessage mail = new MimeMessage(session);
		
		try {
			//from email
			mail.setFrom(from);
			
			//adding recipient to message
			mail.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
			
			//adding subject to message
			mail.setSubject(EMAIL_SUBJECT);
			
			//adding text to message
			mail.setContent(setEmailBody(userName, generatedOTP), "text/html");
			
			//send
			
			//step 3 : send the message using Transport class
			Transport.send(mail);
			
			System.out.println("Mail sent success.......................");
			f = true;
			
		} 
		catch (AddressException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new AddressException("incorect email address");
		}
		catch(MessagingException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new MessagingException("Unable to send email");
		}
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception("Oops... Something went wrong.");
		}
				
		return f;
	}

}
