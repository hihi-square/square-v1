package com.hihi.square.domain.user.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Pattern;

import org.json.simple.parser.ParseException;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.entity.UserRankType;
import com.hihi.square.domain.user.entity.UserSocialLoginType;
import com.hihi.square.domain.user.entity.UserStatusType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SocialLoginService {


	@Value("${social.kakao.rest-api}")
	private String KAKAO_REST_API;

	@Value("${social.kakao.redirect-uri}")
	private String KAKAO_REDIRECT_URI;

	@Value("${social.naver.client-id}")
	private String NAVER_CLIENT_ID;

	@Value("${social.naver.client-secret}")
	private String NAVER_CLIENT_SECRET;

	@Value("${social.naver.state}")
	private String NAVER_STATE;

	@Value("${social.naver.redirect-uri}")
	private String NAVER_REDIRECT_URI;





	public String kakaoGetToken(String code) {
		String host = "https://kauth.kakao.com/oauth/token";
		URL url;
		String token = "";
		try {
			url = new URL(host);

			HttpURLConnection urlConnection;

			urlConnection = (HttpURLConnection) url.openConnection();

			urlConnection.setRequestMethod("POST");
			urlConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

			urlConnection.setDoOutput(true); // 데이터 기록 알려주는 거

			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(urlConnection.getOutputStream(), "UTF-8"));
			StringBuilder sb = new StringBuilder();
			sb.append("grant_type=authorization_code");
			sb.append("&client_id=" + KAKAO_REST_API);
			sb.append("&redirect_uri=" + KAKAO_REDIRECT_URI);
			sb.append("&code=" + code);
			bw.write(sb.toString());
			bw.flush();

			int responseCode = urlConnection.getResponseCode();
			if (responseCode == 200) {
				BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
				String line = "";
				String result = "";
				while ((line = br.readLine()) != null) {
					result += line;
				}

				// json parse
				JSONParser parser = new JSONParser();
				JSONObject obj = (JSONObject) parser.parse(result);

				String accessToken = obj.get("access_token").toString();

				token = accessToken;
				br.close();
			}
			bw.close();

		} catch (ProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return token;
	}

	public Customer kakaoGetUserInfo(String accessToken) {
		String host = "https://kapi.kakao.com/v2/user/me";
		URL url;
		try {
			url = new URL(host);

			HttpURLConnection urlConnection;

			urlConnection = (HttpURLConnection) url.openConnection();
			urlConnection.setRequestProperty("Authorization", "Bearer " + accessToken);
			urlConnection.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
			urlConnection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
			String line = "";
			String res = "";
			while ((line = br.readLine()) != null) {
				res += line;
			}

			JSONParser parser = new JSONParser();
			JSONObject obj = (JSONObject) parser.parse(res);

			JSONObject kakao_account = (JSONObject) obj.get("kakao_account");
			JSONObject profile = (JSONObject) kakao_account.get("profile");

			String uid = "K"+obj.get("id").toString();
			String name = profile.get("nickname").toString();
			String nickname = profile.get("nickname").toString();
			String email = kakao_account.get("email").toString();

			return Customer.builder()
				.uid(uid)
				.nickname(nickname)
				.name(name)
				.email(email)
				.createdAt(LocalDateTime.now())
				.modifiedAt(LocalDateTime.now())
				.lastLogin(LocalDateTime.now())
				.status(UserStatusType.ST01)
				.marketingAgree(false)
				.rank(UserRankType.UR01)
				.social(UserSocialLoginType.KAKAO)
				.point(0L)
				.build();
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public String naverGetToken(String code) {
		String host = "https://nid.naver.com/oauth2.0/token";
		URL url;
		String token = "";
		try {
			url = new URL(host);

			HttpURLConnection urlConnection;

			urlConnection = (HttpURLConnection) url.openConnection();

			urlConnection.setRequestMethod("POST");
			urlConnection.setRequestProperty("X-Naver-Client-Id", NAVER_CLIENT_ID);
			urlConnection.setRequestProperty("X-Naver-Client-Secret", NAVER_CLIENT_SECRET);

			urlConnection.setDoOutput(true); // 데이터 기록 알려주는 거

			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(urlConnection.getOutputStream(), "UTF-8"));
			StringBuilder sb = new StringBuilder();
			sb.append("grant_type=authorization_code");
			sb.append("&client_id=" + NAVER_CLIENT_ID);
			sb.append("&client_secret="+NAVER_CLIENT_SECRET);
			sb.append("&redirect_uri=" + NAVER_REDIRECT_URI);
			sb.append("&state="+NAVER_STATE);
			sb.append("&code=" + code);
			bw.write(sb.toString());
			bw.flush();

			int responseCode = urlConnection.getResponseCode();
			if (responseCode == 200) {
				BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
				String line = "";
				String result = "";
				while ((line = br.readLine()) != null) {
					result += line;
				}

				// json parse
				JSONParser parser = new JSONParser();
				JSONObject obj = (JSONObject) parser.parse(result);

				String accessToken = obj.get("access_token").toString();

				token = accessToken;
				br.close();
			}
			bw.close();

		} catch (ProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return token;
	}

	public Customer naverGetUserInfo(String accessToken) {
		String host = "https://openapi.naver.com/v1/nid/me";
		URL url;
		try {
			url = new URL(host);

			HttpURLConnection urlConnection;

			urlConnection = (HttpURLConnection) url.openConnection();
			urlConnection.setRequestProperty("Authorization", "Bearer " + accessToken);
			urlConnection.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
			urlConnection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
			String line = "";
			String res = "";
			while ((line = br.readLine()) != null) {
				res += line;
			}

			JSONParser parser = new JSONParser();
			JSONObject obj = (JSONObject) parser.parse(res);

			JSONObject profile = (JSONObject) obj.get("response");

			String uid = "N"+profile.get("id").toString();
			if (uid.length()>=30) {
				uid = uid.substring(0, 29);
			}
			String name = profile.get("name").toString();
			String nickname = profile.get("nickname").toString();
			String email = profile.get("email").toString();
			String phone = profile.get("mobile").toString().replace("-", "");

			return Customer.builder()
				.uid(uid)
				.nickname(nickname)
				.name(name)
				.email(email)
				.createdAt(LocalDateTime.now())
				.modifiedAt(LocalDateTime.now())
				.lastLogin(LocalDateTime.now())
				.status(UserStatusType.ST01)
				.marketingAgree(false)
				.rank(UserRankType.UR01)
				.social(UserSocialLoginType.NAVER)
				.point(0L)
				.phone(phone)
				.build();
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}