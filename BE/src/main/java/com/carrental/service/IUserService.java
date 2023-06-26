package com.carrental.service;

import com.carrental.dto.UserDTO;
import com.carrental.entity.UserEntity;
import com.carrental.enums.OAuthProvider;
import org.springframework.security.core.userdetails.UserDetails;

public interface IUserService {

    UserDTO findByUsernameDTO(String username);

    UserEntity findByUsername(String username);

    UserEntity getOne(Long userId);

    UserEntity findByUsernameAndProvider(String username, OAuthProvider provider);

    boolean checkPassword(UserDetails userDetails, String password);

    boolean checkValidPassword(String password);

    boolean checkExistUser(String username);

    UserDTO save(UserEntity user);
}
