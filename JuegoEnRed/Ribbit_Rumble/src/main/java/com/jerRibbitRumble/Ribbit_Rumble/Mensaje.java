package com.jerRibbitRumble.Ribbit_Rumble;

import java.io.Serializable;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Mensaje implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private long id;
	private Usuario user;
	private String message;
	private LocalDateTime messageDate;
	
	public Mensaje() {
		messageDate = LocalDateTime.now();
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public Usuario getUser() {
		return user;
	}

	public void setUser(Usuario user) {
		this.user = user;
	}
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public String getMessageDate() {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
		
		String hourMinute = messageDate.format(formatter);
		
		return hourMinute;
	}
}
