package com.carrental.requestmodel;
import com.carrental.enums.Gender;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class UpdatedUserRequest {
    private String fullName;
    private Gender gender;
    private Date dob;
    private String phone;
}
