package com.carrental.service.impl;

import com.carrental.dto.UserDTO;
import com.carrental.entity.UserEntity;
import com.carrental.enums.OAuthProvider;
import com.carrental.enums.UserStatus;
import com.carrental.repository.IUserRepository;
import com.carrental.service.IUserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserService  implements IUserService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private ModelMapper mp;

    @Override
    public UserDTO findByUsernameDTO(String username) {
        return this.mp.map(this.userRepository.findByUsername(username), UserDTO.class);
    }

    @Override
    public UserEntity findByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public UserEntity getOne(Long userId) {
        return this.userRepository.findById(userId).get();
    }

    @Override
    public UserEntity findByUsernameAndProvider(String username, OAuthProvider provider) {
        return this.userRepository.findByUsernameAndProvider(username, provider);
    }

    @Override
    public boolean checkPassword(UserDetails userDetails, String password) {
        return this.passwordEncoder.matches(password, userDetails.getPassword());
    }


    @Override
    public boolean checkValidPassword(String password) {
        String regex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,20}$";
       /* (?=.*[0-9]): Chuỗi phải chứa ít nhất một số.
        (?=.*[a-z]): Chuỗi phải chứa ít nhất một chữ thường.
        (?=.*[A-Z]): Chuỗi phải chứa ít nhất một chữ hoa.
        (?=.*[@#$%^&+=!]): Chuỗi phải chứa ít nhất một ký tự đặc biệt.
        (?=\S+$): Không chứa khoảng trắng.
        .{8,20}: Độ dài của chuỗi từ 8 đến 20 ký tự.*/
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(password);
        if (matcher.matches()) {
            return true;
        } else {
        }
        return false;
    }

    @Override
    public boolean checkExistUser(String username) {
        UserEntity foundUser = this.userRepository.findByUsername(username);
        return foundUser != null;
    }

    @Override
    public UserDTO save(UserEntity user) {
        return this.mp.map(this.userRepository.save(user), UserDTO.class);
    }
}
