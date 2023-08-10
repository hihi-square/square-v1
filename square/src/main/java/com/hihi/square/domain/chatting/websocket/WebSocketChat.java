package com.hihi.square.domain.chatting.websocket;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Service;

@Service // 빈 등록
@ServerEndpoint("/socket/chatt") // 해당 URL로 Socket 연결 (Singleton pattern)
@MessageMapping
public class WebSocketChat {
	private static Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());
	private static Logger logger = LoggerFactory.getLogger(WebSocketChat.class);

	@OnOpen // 클라이언트가 접속할 때마다 실행
	public void onOpen(Session session) throws Exception {
		logger.info("open session : {}, clients={}", session.toString(), clients);

		if (!clients.contains(session)) {
			clients.add(session);
			logger.info("session open : {}", session);
		} else {
			logger.info("이미 연결된 session");
		}

	}
	@OnMessage // 메시지 수신 시
	public void onMessage(String message, Session session) throws IOException {
		logger.info("receive message : {}", message);

		for (Session s : clients) {
			if (s.equals(session)) continue;
			logger.info("send data : {}", message);
			s.getBasicRemote().sendText(message);
		}

	}
	@OnClose // 클라이언트가 접속을 종료할 시
	public void onClose(Session session) {
		logger.info("session close : {}", session);
		clients.remove(session);
	}
}
