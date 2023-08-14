// package com.hihi.square;
//
// import org.junit.jupiter.api.Assertions;
// import org.junit.jupiter.api.DisplayName;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.test.context.ActiveProfiles;
// import org.springframework.transaction.annotation.Transactional;
//
// import com.hihi.square.domain.store.entity.Store;
// import com.hihi.square.domain.user.service.UserService;
// import com.hihi.square.global.sse.SseService;
// import com.hihi.square.global.sse.entity.NotificationType;
//
// @SpringBootTest
// @Transactional
// @ActiveProfiles("test")
// class NotificationServiceImplTest {
// 	@Autowired
// 	SseService notificationService;
// 	@Autowired
// 	UserService userService;
// 	// @Autowired
// 	// TestDB testDB;
// 	Store store1 = Store.builder().usrId(1).password("1234").name("hi").build();
// 	//
// 	// @BeforeEach
// 	// void beforeEach() {
// 	// 	testDB.init();
// 	// }
//
// 	@Test
// 	@DisplayName("알림 구독을 진행한다.")
// 	public void subscribe() throws Exception {
// 		//given
// 		String lastEventId = "";
//
// 		//when, then
// 		Assertions.assertDoesNotThrow(() -> notificationService.subscribe(store1.getUsrId().longValue(), lastEventId));
// 	}
//
// 	@Test
// 	@DisplayName("알림 메세지를 전송한다.")
// 	public void send() throws Exception {
// 		//given
// 		String lastEventId = "";
// 		notificationService.subscribe(store1.getUsrId().longValue(), lastEventId);
//
// 		//when, then
// 		Assertions.assertDoesNotThrow(() -> notificationService.send(store1, NotificationType.READY, "스터디 신청에 지원하셨습니다.",
// 			"localhost:8811/store/menuitem"));
// 	}
// }