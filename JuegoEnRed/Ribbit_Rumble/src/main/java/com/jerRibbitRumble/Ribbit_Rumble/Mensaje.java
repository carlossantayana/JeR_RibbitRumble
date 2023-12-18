package com.jerRibbitRumble.Ribbit_Rumble;

import java.io.Serializable;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Mensaje implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private long id;
	private String username;
	private String message;
	private LocalDateTime messageDate;
	private String dateHHMM;
	
	public Mensaje() {
		messageDate = LocalDateTime.now();
		getMessageDate();
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public String getUser() {
		return username;
	}

	public void setUser(String user) {
		this.username = user;
	}
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public void getMessageDate() {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
		
		dateHHMM = messageDate.format(formatter);
	}
}
