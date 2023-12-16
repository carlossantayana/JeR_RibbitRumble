package com.jerRibbitRumble.Ribbit_Rumble;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

public class ChatController {
	private Map<Long, Mensaje> chatMessages = new ConcurrentHashMap<>();
	private AtomicLong lastId = new AtomicLong();

	@PostMapping(value = "/")
	@ResponseStatus(HttpStatus.CREATED)
	public Mensaje createMensaje(@RequestBody Mensaje message) {
		long id = lastId.getAndIncrement();

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
}
