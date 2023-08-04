package com.hihi.square.domain.user.repository;

import com.hihi.square.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    public Optional<User> findByUid(String uid);

    public Optional<User> findByNickname(String nickname);
    Optional<User> findByEmail(String email);

	Optional<User> findByRefreshToken(String refreshToken);

    @Modifying(clearAutomatically = true) // 쿼리 실행 이후 영속성 컨텍스트를 초기화시켜준다.
    @Transactional
    @Query("update User u set u.refreshToken = :refreshToken where u.uid = :uid")
    int updateRefreshToken(@Param("refreshToken") String refreshToken, @Param("uid")String uid);

    Optional<User> findByEmailAndPhone(String email, String phone);

    @Modifying(clearAutomatically = true)
    @Query("update User u set u.password = :password where u.uid = :uid")
    void updatePassword(@Param("uid") String uid, @Param("password") String newPassword);

    Optional<User> findByUsrId(Integer usrId);


}
