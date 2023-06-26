package com.carrental.service.impl;

import com.carrental.constance.SystemConstance;
import com.carrental.dto.JWTDTO;
import com.carrental.entity.JWTEntity;
import com.carrental.repository.IJWTRepository;
import com.carrental.service.IJWTService;
import com.nimbusds.jwt.JWT;
import io.jsonwebtoken.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Service
public class JWTService implements IJWTService {

    @Autowired
    private IJWTRepository jwtRepository;

    @Autowired
    private ModelMapper mp;

    @Override
    public JWTDTO save(JWTEntity jwt) {
        JWTEntity savedJWT = jwtRepository.save(jwt);
        return this.mp.map(savedJWT, JWTDTO.class);
    }

    @Override
    public JWTEntity findByToken(String token) {
        return this.jwtRepository.findByToken(token);
    }

    @Override
    public Long removeByToken(String token) {
        return this.jwtRepository.removeByToken(token);
    }

    @Override
    public String generateToken(UserDetails userDetails, String type) {
        Map<String, Object> claims = new HashMap<>();
        if (userDetails.getAuthorities() != null) {
            Collection<? extends GrantedAuthority> roles = userDetails.getAuthorities();
            List<String> rolesList = new ArrayList<>();
            for (GrantedAuthority role : roles) {
                rolesList.add(role.getAuthority());
            }
            claims.put("roles", rolesList);
        }
        return doGenerateToken(claims, userDetails.getUsername(), type);
    }

    @Override
    public String doGenerateToken(Map<String, Object> claims, String subject, String type) {
        if (type == "access") {
            return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + SystemConstance.EXPIRATION_TIME))
                    .signWith(SignatureAlgorithm.HS512, SystemConstance.SECRET_KEY).compact();
        } else {
            // refresh
            return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + SystemConstance.REFRESH_TIME))
                    .signWith(SignatureAlgorithm.HS512, SystemConstance.SECRET_KEY).compact();
        }
    }

    @Override
    public boolean validateToken(String token) {
        System.out.println(token);
        JWTEntity foundJwtEntity = this.jwtRepository.findByToken(token);
        try {
            if (foundJwtEntity != null && foundJwtEntity.getToken().equals(token)) {
                Jwts.parser()
                        .setSigningKey(SystemConstance.SECRET_KEY)
                        .setAllowedClockSkewSeconds(60)
                        .parseClaimsJws(token);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            // handle exception
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(SystemConstance.SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    @Override
    public Date getExpirationDateFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(SystemConstance.SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }

    @Override
    public List<SimpleGrantedAuthority> getRolesFromToken(String token) {
        return null;
    }

    // Check if JWT token is expired
    @Override
    public boolean isTokenExpired(String token) {
        Date expirationDate = Jwts.parser()
                .setSigningKey(SystemConstance.SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expirationDate.before(new Date());
    }

    @Override
    public void parseGoogleJwt(String jwt) {
        System.out.println(jwt);

        try {
            Claims claims = Jwts.parser().parseClaimsJwt(jwt).getBody();
            System.out.println(claims);
            String subject = claims.getSubject();
            System.out.println(subject);
            // Get other claims as needed
        } catch (JwtException ex) {
            // Handle exception
            System.out.println(ex);
        }
    }
}
