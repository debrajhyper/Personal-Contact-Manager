package com.pcm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.pcm.Service.DemoUserService;


@Component
public class ScheduledDemoUserTask {
	
	@Autowired
	private DemoUserService demoUserService;
	
	@Scheduled(fixedDelay = 15 * 24 * 60 * 60 * 1000) // 15 days in milliseconds
    public void myScheduledFunction() throws Exception {
        // corn job to be executed every 15 days
		System.out.println("\n\n======================================================   SCHEDULED -> REMOVE DEMO USERS | STARTED  =======================================================");
        this.demoUserService.scheduleRemoveDemoUser();
		System.out.println("======================================================   SCHEDULED -> REMOVE DEMO USERS | COMPLETED   =======================================================\n\n");
    }
}
