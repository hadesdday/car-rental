package com.carrental.controller;

import com.carrental.constance.SystemConstance;
import com.carrental.entity.UserEntity;
import com.carrental.enums.OTPType;
import com.carrental.enums.UserStatus;
import com.carrental.responsemodel.APIResponse;
import com.carrental.service.IOTPService;
import com.carrental.service.IUserService;
import com.carrental.service.impl.JavaMailSenderService;
import com.carrental.template.MailTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/otp")
public class OTPController {
    @Autowired
    private IUserService userService;
    @Autowired
    private IOTPService registerOTPService;

    @Autowired
    private IOTPService changePasswordOTPService;

    @Autowired
    private JavaMailSenderService javaMailSenderService;

    @Value("${spring.application.mailHTMLPath}")
    public String mailHTMLPath;


    @GetMapping("/generate-otp")
    public ResponseEntity generateOTP(@RequestParam String username, @RequestParam OTPType otpType) {
        System.out.println(otpType);
        System.out.println(otpType.equals(OTPType.REGISTER));
        int generatedOTPNumber;
        if(otpType.equals(OTPType.REGISTER)){
            generatedOTPNumber = this.registerOTPService.generateOTP(username);
        }else{
            generatedOTPNumber = this.changePasswordOTPService.generateOTP(username);
        }
        MailTemplate mailTemplate = new MailTemplate(this.mailHTMLPath);
        Map<String, String> replacements = new HashMap<String, String>();
        replacements.put("username", username);
        replacements.put("OTPNumber", String.valueOf(generatedOTPNumber));
        replacements.put("applicationName", SystemConstance.APPLICATION_NAME);
        String message = mailTemplate.getTemplate(replacements);
        try {
            this.javaMailSenderService.sendOTPMessage(username, "Rental Car: Confirm OTP to sign up", message);
            APIResponse<String> response = new APIResponse<>("Mã xác thực đã được gửi đến email của bạn", HttpStatus.CREATED.getReasonPhrase(), HttpStatus.CREATED.value());
            return ResponseEntity.ok(response);
        } catch (MessagingException e) {
            APIResponse<String> response = new APIResponse<>("Đã xảy ra lỗi. Vui lòng thử lại", HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.ok(response);
        }
    }

    @GetMapping("/validate-otp")
    public ResponseEntity validateOtp(@RequestParam String username, @RequestParam int OTPNumber, @RequestParam OTPType otpType) {
        int foundOTPNUmber;
        if(otpType.equals(OTPType.REGISTER)){
            foundOTPNUmber = this.registerOTPService.getOTP(username);
        }else{
            foundOTPNUmber = this.changePasswordOTPService.getOTP(username);
        }
        if (foundOTPNUmber > 0) {
            if (OTPNumber == foundOTPNUmber) {
                if(otpType.equals(OTPType.REGISTER)){
                    UserEntity foundUser = this.userService.findByUsername(username);
                    foundUser.setStatus(UserStatus.ACTIVATED);
                    this.userService.save(foundUser);
                    this.registerOTPService.clearOTP(username);
                }else{
                    this.changePasswordOTPService.clearOTP(username);
                }
                APIResponse<String> response = new APIResponse<>("Xác thực thành công", HttpStatus.OK.getReasonPhrase(), HttpStatus.OK.value());
                return ResponseEntity.ok(response);
            } else {
                APIResponse<String> response = new APIResponse<>("Mã xác thực không hợp lệ. Vui lòng thử lại", HttpStatus.BAD_REQUEST.getReasonPhrase(), HttpStatus.BAD_REQUEST.value());
                return ResponseEntity.ok(response);
            }
        } else {
            APIResponse<String> response = new APIResponse<>("Mã xác thực không hợp lệ hoặc đã hết hạn. Vui lòng thử lại", HttpStatus.UNPROCESSABLE_ENTITY.getReasonPhrase(), HttpStatus.UNPROCESSABLE_ENTITY.value());
            return ResponseEntity.ok(response);
        }
    }
    @GetMapping(value = "/forget-password")
    public ResponseEntity<Boolean> changePassword(@RequestBody String username) {
        if (!StringUtils.isEmpty(username)) {
            String refactorUsername = StringUtils.trimAllWhitespace(username);
            UserEntity foundUser = this.userService.findByUsername(refactorUsername);
            if (foundUser != null) {
                return ResponseEntity.ok(true);
            }
            return ResponseEntity.ok(false);
        }
        return ResponseEntity.ok(false);
    }
}
