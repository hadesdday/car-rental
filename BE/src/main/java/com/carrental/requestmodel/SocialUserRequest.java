package com.carrental.requestmodel;

import com.carrental.enums.OAuthProvider;
import lombok.Data;

@Data
public class SocialUserRequest {
    private String email;
    private String name;
    private OAuthProvider provider;
    private String photoUrl;
    private String id;
}
