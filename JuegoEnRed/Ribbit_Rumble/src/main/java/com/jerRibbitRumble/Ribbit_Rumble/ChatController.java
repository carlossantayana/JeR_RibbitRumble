package com.jerRibbitRumble.Ribbit_Rumble;

import java.io.*;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Chat")
public class ChatController {
	private Map<Long, Mensaje> chatMessages = new ConcurrentHashMap<>();
	
	private String fileName = "ChatMessagesFile.txt";

	@PostMapping(value = "/")
	@ResponseStatus(HttpStatus.CREATED)
	public Mensaje createMensaje(@RequestBody Mensaje message) {
		long id = chatMessages.size();

		message.setId(id);
		chatMessages.put(id, message);

		return message;
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Mensaje> getMensaje(@PathVariable long id) {
		Mensaje message= chatMessages.get(id);

		if (message != null) {
			return new ResponseEntity<>(message, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping(value = "/")
	public Collection<Mensaje> getMensaje() {
		return chatMessages.values();
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Mensaje> updateMensaje(@PathVariable long id, @RequestBody Mensaje messageUpdated) {
		Mensaje message = chatMessages.get(id);

		if (message != null) {
			messageUpdated.setId(id);
			chatMessages.put(id, messageUpdated);
			return new ResponseEntity<>(messageUpdated, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Mensaje> deleteMensaje(@PathVariable long id) {
		Mensaje message = chatMessages.remove(id);

		if (message != null) {
			return new ResponseEntity<>(message, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PreDestroy
	public void writeChatMessagesFile() {
	    try (ObjectOutputStream outputStream = new ObjectOutputStream(new FileOutputStream(fileName))) {
	        outputStream.writeObject(chatMessages);
	        System.out.println("HashMap guardado en el archivo '" + fileName + "' correctamente.");
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	}
	
	@PostConstruct
	public void readChatMessagesFile() {
	    try (ObjectInputStream inputStream = new ObjectInputStream(new FileInputStream(fileName))) {
	    	chatMessages = (Map<Long, Mensaje>) inputStream.readObject();
	        System.out.println("Map leído desde el archivo '" + fileName + "':");
	        for (Long key : chatMessages.keySet()) {
	            System.out.println("Key: " + key + ", Value: " + chatMessages.get(key));
	        }
	    } catch (IOException | ClassNotFoundException e) {
	        e.printStackTrace();
	    }
	}
}
