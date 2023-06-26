package com.carrental.service;

import com.carrental.entity.UserEntity;
import com.carrental.enums.OAuthProvider;
import com.carrental.enums.Role;
import com.carrental.enums.UserStatus;
import com.carrental.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private IUserRepository userRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByUsername(username);
        User user;
        if (userEntity != null && userEntity.getStatus().equals((UserStatus.ACTIVATED))) {
            List<SimpleGrantedAuthority> roles = new ArrayList<SimpleGrantedAuthority>();
            if (userEntity.getRole() != null) {
                roles.add(new SimpleGrantedAuthority(userEntity.getRole().name()));
            }
            user = new User(username, userEntity.getPassword(), roles);
            return user;
        }else{
            return null;
        }
    }

}
