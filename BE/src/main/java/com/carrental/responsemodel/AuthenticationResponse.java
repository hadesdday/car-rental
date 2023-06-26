package com.carrental.responsemodel;

import com.carrental.dto.JWTDTO;
import com.carrental.dto.UserDTO;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private UserDTO user;
    private JWTDTO accessToken;
    private JWTDTO refreshToken;

    public AuthenticationResponse(UserDTO userDTO, JWTDTO accessToken, JWTDTO refreshToken) {
        this.user = userDTO;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
