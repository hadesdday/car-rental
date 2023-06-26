package com.carrental.filter;

import com.carrental.service.CustomUserDetailsService;
import com.carrental.service.IHttpHeaderReader;
import com.carrental.service.IJWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class RequestAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private IHttpHeaderReader httpHeaderReader;

    @Autowired
    private IJWTService jwtService;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = this.httpHeaderReader.getTokenFromHeader(request);
        System.out.println(token);
        if (StringUtils.hasText(token) && jwtService.validateToken(token)) {
            String username = this.jwtService.getUsernameFromToken(token);
            System.out.println("pass request filter");
            UserDetails userDetails = this.customUserDetailsService.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails.getUsername(), null, userDetails.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        System.out.println("token " + token);
        filterChain.doFilter(request, response);
    }
}
