package com.carrental.service;

import com.carrental.dto.JWTDTO;
import com.carrental.entity.JWTEntity;
import com.carrental.entity.UserEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface IJWTService {

    JWTDTO save(JWTEntity token);

    JWTEntity findByToken(String token);

    Long removeByToken(String token);

    String generateToken(UserDetails userDetails, String type);

    String doGenerateToken(Map<String, Object> claims, String subject, String type);

    boolean validateToken(String authToken);

    String getUsernameFromToken(String token);

    Date getExpirationDateFromToken(String token);

    List<SimpleGrantedAuthority> getRolesFromToken(String token);

    boolean isTokenExpired(String token);

    void parseGoogleJwt(String jwt);
}
