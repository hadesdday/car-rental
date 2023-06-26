package com.carrental.dto;

import lombok.Data;

import java.util.Date;

@Data
public class JWTDTO {
    String token;
    Date tokenExpirationDate;
}
