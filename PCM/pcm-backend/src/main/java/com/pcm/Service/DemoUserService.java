package com.pcm.Service;

import com.pcm.Model.User;

public interface DemoUserService {
	
	//CREATE DEMO USER
	public User createDemoUser() throws Exception;
	
	//REMOVE DEMO USER
	public void removeDemotUserWithSession(String email) throws Exception;
	
	//SCHEDULE REMOVE DEMO USER
	public void scheduleRemoveDemoUser() throws Exception;

}
