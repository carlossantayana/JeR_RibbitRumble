package com.jerRibbitRumble.Ribbit_Rumble;


import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebSocketHandler extends TextWebSocketHandler{
	
	private final Object lock = new Object();
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	private ScheduledExecutorService executorService;
	private int cifra1=6;
	private int cifra2=0;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New session: " + session.getId());
		System.out.println("Numero total de sesiones abiertas: " + sessions.size());
		
		
		if(sessions.size() <= 1) {
			sessions.put(session.getId(), session);
			
			ObjectNode node = mapper.createObjectNode();
			node.put("type", "login");
			node.put("data", (sessions.size()));
			session.sendMessage(new TextMessage(node.toString()));
			
		} else {
			System.out.println("Numero maximo de sesiones abiertas, cerrando WebSocket");
			session.close();
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		stopTimer();
		System.out.println("Session closed: " + session.getId());
		for (Map.Entry<String, WebSocketSession> entry : sessions.entrySet()) 
		{
            if(entry.getKey()!= session.getId()) {
				if(entry.getValue().isOpen()){
            		otherLogOut(entry.getValue());
				}
            }
		}
		sessions.remove(session.getId());	
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		if(message.getPayload()!=null)
		{
			JsonNode node = mapper.readTree(message.getPayload());
			String type = node.get("type").toString();
			
			type = type.replaceAll("\"", "");
			
			switch(type) {
				case "pairing":
					pairPlayers(session);
					break;
					
				case "characterSelection":
					for (Map.Entry<String, WebSocketSession> entry : sessions.entrySet()) 
					{
			            if(entry.getKey()!= session.getId()) {
			            	selectCharacter(entry.getValue(), node);
			            }
					}
					break;
				case "mapSelection":
					for (Map.Entry<String, WebSocketSession> entry : sessions.entrySet()) 
					{
			            if(entry.getKey()!= session.getId()) {
			            	selectMap(entry.getValue(), node);
			            }
					}
					break;
				case "finalMapSelection":
					for (Map.Entry<String, WebSocketSession> entry : sessions.entrySet()) 
					{
			            if(entry.getKey()!= session.getId()) {
			            	sendFinalMapSelection(entry.getValue(), node);
			            }
					}
					break;
				case "inputUpdate":
					
					for (Map.Entry<String, WebSocketSession> entry : sessions.entrySet()) 
					{
			            if(entry.getKey()!= session.getId()) {
			            	updateInputs(entry.getValue(), node);
			            }
					}
					break;
				case "startRound":
					System.out.println("Update started");
					startTimer(session);
					break;
				case "stopRound":
					stopTimer();
					break;
				case "restartRound":
					restartTimer();
					break;
			}
		}

	}

	private void startTimer(WebSocketSession session) {		
	    if (executorService == null || executorService.isShutdown()) {	        
	        executorService = Executors.newSingleThreadScheduledExecutor();
	        executorService.scheduleAtFixedRate(() -> {
				try {
					updateCountdown(session);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					stopTimer();
				}
			}, 0, 1, TimeUnit.SECONDS);
	    }
	}

	private void updateCountdown(WebSocketSession session) throws Exception {
	   try {
	        if(!(this.cifra2==0 && this.cifra1==0))
	        {
				this.cifra2--;
		        if (this.cifra2 == -1) {  
		            this.cifra2 = 9;
		            this.cifra1--;
		        }
	        }
			ObjectNode node = mapper.createObjectNode();
			node.put("type", "time");
			node.put("data1", this.cifra1);
			node.put("data2", this.cifra2);

			System.out.println("Updated countdown");
			sendTime(node);
	    } catch (InterruptedException e) {
	        Thread.currentThread().interrupt();
	        stopTimer();
	    }

	}
	
    private void stopTimer() {
        if (executorService != null && !executorService.isShutdown()) {
            executorService.shutdownNow();
            executorService = null;   
        }
    }
    
    private void restartTimer() {
	   	this.cifra1=6;
	    this.cifra2=0;
    }
	    
	public void pairPlayers(WebSocketSession session) throws Exception{
		String pairState;

		if(sessions.size() == 2){
			pairState = "true";
		}else{
			pairState = "false";
		}

		ObjectNode node = mapper.createObjectNode();
		node.put("type", "pairing");
		node.put("data", pairState);

		session.sendMessage(new TextMessage(node.toString()));
	}
	
	public void selectCharacter(WebSocketSession session, JsonNode node) throws Exception{
		session.sendMessage(new TextMessage(node.toString()));
	}
	public void selectMap(WebSocketSession session, JsonNode node) throws Exception{
		session.sendMessage(new TextMessage(node.toString()));
	}
	public void sendFinalMapSelection(WebSocketSession session, JsonNode node) throws Exception{
		session.sendMessage(new TextMessage(node.toString()));
	}
	
	public void updateInputs(WebSocketSession session, JsonNode node) throws Exception{
		sendMessageToSession(session, node);
	}
	
	
	public void sendTime(JsonNode node) throws Exception{
	    for (WebSocketSession entry : sessions.values()) {
	        sendMessageToSession(entry, node);
	    }
	}
	
	public void otherLogOut(WebSocketSession session) throws Exception{
		ObjectNode node = mapper.createObjectNode();
		node.put("type", "logout");
		node.put("data", true);
		session.sendMessage(new TextMessage(node.toString()));
	}
	
	private void sendMessageToSession(WebSocketSession session, JsonNode node) {
	    synchronized (lock) {
	        try {
	        	session.sendMessage(new TextMessage(node.toString()));;
	        } catch (IOException e) {
	            e.printStackTrace(); // O manejar la excepción según tus necesidades
	        }
	    }
	}
}
