package com.carrental.entity;

import com.carrental.enums.ImageStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "user_avatar")
@Getter
@Setter
public class UserAvatarEntity extends BaseEntity {
    private String imageUrl;
    private ImageStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}

