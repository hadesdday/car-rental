package com.carrental.requestmodel;
import lombok.Data;

@Data
public class SignUpRequest {
    private String username;
    private String password;
    private String fullName;
    private String phone;
}
