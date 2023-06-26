package com.carrental.controller;

import com.carrental.dto.JWTDTO;
import com.carrental.dto.UserDTO;
import com.carrental.entity.JWTEntity;
import com.carrental.entity.UserEntity;
import com.carrental.enums.Gender;
import com.carrental.enums.OAuthProvider;
import com.carrental.enums.Role;
import com.carrental.enums.UserStatus;
import com.carrental.requestmodel.ForgetPasswordRequest;
import com.carrental.requestmodel.LoginRequest;
import com.carrental.requestmodel.SignUpRequest;
import com.carrental.requestmodel.SocialUserRequest;
import com.carrental.responsemodel.APIResponse;
import com.carrental.responsemodel.AuthenticationResponse;
import com.carrental.service.CustomUserDetailsService;
import com.carrental.service.IHttpHeaderReader;
import com.carrental.service.IJWTService;
import com.carrental.service.IUserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CustomUserDetailsService customUserDetailService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IUserService socialUserService;

    @Autowired
    private IJWTService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private IHttpHeaderReader httpHeaderReader;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @PostMapping("/sign-in")
    public ResponseEntity login(@RequestBody @Valid LoginRequest loginRequest, BindingResult bindingResult) {
        System.out.println(loginRequest);
        UserDetails userDetails;
        userDetails = this.customUserDetailService.loadUserByUsername(loginRequest.getUsername());
        if (userDetails != null) {
            if(this.userService.checkPassword(userDetails, loginRequest.getPassword())){
                // create JWT
                String accessToken = this.jwtService.generateToken(userDetails, "access");
                Date expiredAccessToken = this.jwtService.getExpirationDateFromToken(accessToken);
                String refreshToken = this.jwtService.generateToken(userDetails, "refresh");
                Date expiredRefreshToken = this.jwtService.getExpirationDateFromToken(refreshToken);
                JWTEntity accessJWTEntity = new JWTEntity(accessToken, expiredAccessToken);
                JWTEntity refreshJWTEntity = new JWTEntity(refreshToken, expiredRefreshToken);
                JWTDTO accessJWTDTO = jwtService.save(accessJWTEntity);
                JWTDTO refreshJWTDTO = jwtService.save(refreshJWTEntity);
                System.out.println("cpjwt " + accessJWTDTO.getToken().equals(refreshJWTDTO.getToken()));
                UserDTO userDTO = this.userService.findByUsernameDTO(userDetails.getUsername());
                AuthenticationResponse data = new AuthenticationResponse(userDTO, accessJWTDTO, refreshJWTDTO);
                APIResponse<AuthenticationResponse> response = new APIResponse<>(data, HttpStatus.OK.getReasonPhrase(), HttpStatus.OK.value());
                return ResponseEntity.ok(response);
            }else{
                APIResponse<String> response = new APIResponse<>("Sai mật khẩu", HttpStatus.BAD_REQUEST.getReasonPhrase(), HttpStatus.BAD_REQUEST.value());
                return ResponseEntity.ok(response);
            }
        } else {
            APIResponse<String> response = new APIResponse<>("Người dùng chưa được đăng ký", HttpStatus.BAD_REQUEST.getReasonPhrase(), HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.ok(response);
        }

    }

    @PostMapping("/social-sign-in")
    public ResponseEntity signInWithGoogle(@RequestBody SocialUserRequest socialUserRequest) {
        System.out.println(socialUserRequest);
        String id = socialUserRequest.getId();
        OAuthProvider provider = socialUserRequest.getProvider();
        UserDetails userDetails;
        userDetails = this.customUserDetailService.loadUserByUsername(id);
        UserDTO user;
        if (userDetails == null) {
            List<SimpleGrantedAuthority> roles = new ArrayList<SimpleGrantedAuthority>();
            roles.add(new SimpleGrantedAuthority(Role.USER.name()));
            userDetails = new User(id, "", roles);
            UserEntity newSocialUser = new UserEntity();
            newSocialUser.setUsername(id);
            newSocialUser.setPassword("");
            newSocialUser.setEmail(socialUserRequest.getEmail());
            newSocialUser.setProvider(provider);
            newSocialUser.setFullName(socialUserRequest.getName());
            newSocialUser.setStatus(UserStatus.ACTIVATED);
            newSocialUser.setRole(Role.USER);
            user = this.userService.save(newSocialUser);
        }else{
            user = this.userService.findByUsernameDTO(userDetails.getUsername());
        }
        System.out.println(userDetails);
        String accessToken = this.jwtService.generateToken(userDetails, "access");
        Date expiredAccessToken = this.jwtService.getExpirationDateFromToken(accessToken);
        String refreshToken = this.jwtService.generateToken(userDetails, "refresh");
        Date expiredRefreshToken = this.jwtService.getExpirationDateFromToken(refreshToken);
        JWTEntity accessJWTEntity = new JWTEntity(accessToken, expiredAccessToken);
        JWTEntity refreshJWTEntity = new JWTEntity(refreshToken, expiredRefreshToken);
        JWTDTO accessJWTDTO = jwtService.save(accessJWTEntity);
        JWTDTO refreshJWTDTO = jwtService.save(refreshJWTEntity);
        AuthenticationResponse data = new AuthenticationResponse(user, accessJWTDTO, refreshJWTDTO);
        APIResponse<AuthenticationResponse> response = new APIResponse<>(data, HttpStatus.OK.getReasonPhrase(), HttpStatus.OK.value());
        return ResponseEntity.ok(response);
    }


    @PostMapping("/validate-sign-up")
    public ResponseEntity validSignUp(@RequestBody SignUpRequest signUpRequest) {
        boolean isValidPassword = this.userService.checkValidPassword(signUpRequest.getPassword());
        boolean isExistUser = this.userService.checkExistUser(signUpRequest.getUsername());
        if (isExistUser) {
            UserEntity foundUser = this.userService.findByUsername(signUpRequest.getUsername());
            if (foundUser.getStatus().equals(UserStatus.UNACTIVATED)) {
                foundUser.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
                foundUser.setPhone(signUpRequest.getPhone());
                foundUser.setFullName(signUpRequest.getFullName());
                foundUser.setEmail(signUpRequest.getUsername());
                foundUser.setGender(Gender.MALE);
                this.userService.save(foundUser);
                APIResponse<String> response = new APIResponse<String>("Thông tin hợp lệ", HttpStatus.OK.getReasonPhrase(), HttpStatus.OK.value());
                return ResponseEntity.ok(response);
            } else {
                APIResponse<String> response = new APIResponse<String>("Tài khoản đã tồn tại", HttpStatus.CONFLICT.getReasonPhrase(), HttpStatus.CONFLICT.value());
                return ResponseEntity.ok(response);
            }
        } else {
            if (isValidPassword) {
                APIResponse<String> response = new APIResponse<String>("Thông tin hợp lệ", HttpStatus.OK.getReasonPhrase(), HttpStatus.OK.value());
                UserEntity nonActiveUser = new UserEntity();
                nonActiveUser.setUsername(signUpRequest.getUsername());
                nonActiveUser.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
                nonActiveUser.setPhone(signUpRequest.getPhone());
                nonActiveUser.setFullName(signUpRequest.getFullName());
                nonActiveUser.setEmail(signUpRequest.getUsername());
                nonActiveUser.setGender(Gender.MALE);
                nonActiveUser.setStatus(UserStatus.UNACTIVATED);
                nonActiveUser.setProvider(OAuthProvider.APPLICATION);
                this.userService.save(nonActiveUser);
                return ResponseEntity.ok(response);
            } else {
                APIResponse<String> response = new APIResponse<String>("Mật khẩu không hợp lệ", HttpStatus.BAD_REQUEST.getReasonPhrase(), HttpStatus.BAD_REQUEST.value());
                return ResponseEntity.ok(response);
            }
        }
    }

    @GetMapping("/refresh-access-token")
    public ResponseEntity refreshAccessToken(HttpServletRequest request) {
        System.out.println("rft");
        String refreshToken = this.httpHeaderReader.getTokenFromHeader(request);
        System.out.println("rft " + refreshToken);
        if (StringUtils.hasText(refreshToken) && this.jwtService.validateToken(refreshToken)) {
            String username = this.jwtService.getUsernameFromToken(refreshToken);
            UserDetails userDetails = this.customUserDetailsService.loadUserByUsername(username);
            String newAccessToken = this.jwtService.generateToken(userDetails, "access");
            String newRefreshToken = this.jwtService.generateToken(userDetails, "refresh");
            Date expiredNewAccessToken = this.jwtService.getExpirationDateFromToken(newAccessToken);
            Date expiredNewRefreshToken = this.jwtService.getExpirationDateFromToken(newRefreshToken);
            JWTEntity newAccessTokenEntity = new JWTEntity(newAccessToken, expiredNewAccessToken);
            JWTEntity foundRefreshTokenEntity = this.jwtService.findByToken(refreshToken);
            foundRefreshTokenEntity.setToken(newRefreshToken);
            foundRefreshTokenEntity.setTokenExpirationDate(expiredNewRefreshToken);
            JWTDTO newAccessTokenDTO = jwtService.save(newAccessTokenEntity);
            JWTDTO foundRefreshTokenDTO = jwtService.save(foundRefreshTokenEntity);
            UserDTO userDTO = this.userService.findByUsernameDTO(userDetails.getUsername());
            AuthenticationResponse data = new AuthenticationResponse(userDTO, newAccessTokenDTO, foundRefreshTokenDTO);
            APIResponse<AuthenticationResponse> response = new APIResponse<>(data, HttpStatus.OK.getReasonPhrase(), HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } else {
            APIResponse<String> response = new APIResponse<String>("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại", HttpStatus.BAD_REQUEST.getReasonPhrase(), HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping(value = "/revoke-token")
    public ResponseEntity revokeToken(HttpServletRequest request, @RequestBody String refreshToken) {
        try {
            String accessToken = this.httpHeaderReader.getTokenFromHeader(request);
            Long removedAccess = this.jwtService.removeByToken(accessToken);
            Long removedRefresh = this.jwtService.removeByToken(refreshToken);
            if (removedAccess.longValue() != -1 && removedAccess.longValue() != -1) {
                APIResponse<String> response = new APIResponse<String>("Thu hồi thành công", HttpStatus.OK.getReasonPhrase(), HttpStatus.OK.value());
                return ResponseEntity.ok(response);
            } else {
                APIResponse<String> response = new APIResponse<String>("Thu hồi thất bại", HttpStatus.BAD_REQUEST.getReasonPhrase(), HttpStatus.BAD_REQUEST.value());
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            APIResponse<String> response = new APIResponse<String>("Thu hồi thất bại", HttpStatus.BAD_REQUEST.getReasonPhrase(), HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/check-activated-user")
    public ResponseEntity checkActivatedUser(@RequestBody String username) {
        UserEntity foundUser = this.userService.findByUsername(username);
        if (foundUser != null && foundUser.getStatus().equals(UserStatus.ACTIVATED)) {
            APIResponse<String> response = new APIResponse<String>(null, HttpStatus.OK.getReasonPhrase(), HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } else if (foundUser != null && foundUser.getStatus().equals(UserStatus.BANNED)) {
            APIResponse<String> response = new APIResponse<String>("Tài khoản của bạn đã bị khoá", HttpStatus.FORBIDDEN.getReasonPhrase(), HttpStatus.FORBIDDEN.value());
            return ResponseEntity.ok(response);
        } else {
            APIResponse<String> response = new APIResponse<String>("Tài khoản không tồn tại", HttpStatus.BAD_REQUEST.getReasonPhrase(), HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping(value = "/change-password")
    public ResponseEntity changePassword(@RequestBody ForgetPasswordRequest forgetPasswordRequest) {
        UserEntity foundUser = this.userService.findByUsername(forgetPasswordRequest.getUsername());
        if (foundUser != null && foundUser.getStatus().equals(UserStatus.ACTIVATED) && this.userService.checkValidPassword(forgetPasswordRequest.getNewPassword())) {
            foundUser.setPassword(passwordEncoder.encode(forgetPasswordRequest.getNewPassword()));
            this.userService.save(foundUser);
            APIResponse<String> response = new APIResponse<String>("Đổi mật khẩu thành công", HttpStatus.OK.getReasonPhrase(), HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } else {
            APIResponse<String> response = new APIResponse<String>("Đổi mật khẩu không thành công", HttpStatus.BAD_REQUEST.getReasonPhrase(), HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.ok(response);
        }
    }
}
