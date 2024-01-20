package com.jerRibbitRumble.Ribbit_Rumble;


import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebSocketHandler extends TextWebSocketHandler{
	
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New session: " + session.getId());
		
		sessions.put(session.getId(), session);
		
		ObjectNode node = mapper.createObjectNode();
		node.put("type", "login");
		node.put("data", (sessions.size()));
		session.sendMessage(new TextMessage(node.toString()));
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
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
		            	System.out.println(entry.getValue());
		            	selectCharacter(entry.getValue(), node);
		            }
				}
				break;
			case "mapSelection":
				for (Map.Entry<String, WebSocketSession> entry : sessions.entrySet()) 
				{
		            if(entry.getKey()!= session.getId()) {
		            	System.out.println(entry.getValue());
		            	selectMap(entry.getValue(), node);
		            }
				}
				break;
			case "finalMapSelection":
				for (Map.Entry<String, WebSocketSession> entry : sessions.entrySet()) 
				{
		            if(entry.getKey()!= session.getId()) {
		            	System.out.println(entry.getValue());
		            	sendFinalMapSelection(entry.getValue(), node);
		            }
				}
				break;
			case "inputUpdate":
				
				for (Map.Entry<String, WebSocketSession> entry : sessions.entrySet()) 
				{
		            if(entry.getKey()!= session.getId()) {
		            	System.out.println(entry.getValue());
		            	updateInputs(entry.getValue(), node);
		            }
				}
				break;
		}
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
		session.sendMessage(new TextMessage(node.toString()));
	}
}
