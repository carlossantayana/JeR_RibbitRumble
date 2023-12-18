package com.jerRibbitRumble.Ribbit_Rumble;

import java.io.Serializable;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Mensaje implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private long id;
	private String user;
	private String message;
	private String dateHHMM;
	
	public Mensaje() {
		LocalDateTime messageDate = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
		
		dateHHMM = messageDate.format(formatter);
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public String getDateHHMM() {
		return dateHHMM;
	}
}
