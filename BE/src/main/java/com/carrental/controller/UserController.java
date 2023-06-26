package com.carrental.controller;

import com.carrental.entity.UserEntity;
import com.carrental.requestmodel.UpdatedUserRequest;
import com.carrental.responsemodel.APIResponse;
import com.carrental.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.function.EntityResponse;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private IUserService userService;
    @PostMapping("/update")
    public ResponseEntity updateUser(@RequestBody UpdatedUserRequest updatedUserRequest){
        System.out.println(updatedUserRequest);
        try{
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            UserEntity foundUser = this.userService.findByUsername(username);
            foundUser.setFullName(updatedUserRequest.getFullName());
            foundUser.setGender(updatedUserRequest.getGender());
            foundUser.setDob(updatedUserRequest.getDob());
            foundUser.setPhone(updatedUserRequest.getPhone());
            this.userService.save(foundUser);
            APIResponse<String> response = new APIResponse<>("Cập nhật thành công", HttpStatus.OK.getReasonPhrase(), HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        }catch(Exception e){
            APIResponse<String> response = new APIResponse<>("Cập nhật thất bại", HttpStatus.OK.getReasonPhrase(), HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        }
    }
}
