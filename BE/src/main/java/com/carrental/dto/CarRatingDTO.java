package com.carrental.dto;

import com.carrental.entity.CarEntity;
import com.carrental.entity.UserEntity;
import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
public class CarRatingDTO {
    private UserDTO user;
    private String name;
    private String content;
    private Double rating;
}
