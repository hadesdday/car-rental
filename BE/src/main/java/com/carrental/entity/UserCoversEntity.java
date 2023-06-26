package com.carrental.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "user_covers")
@Getter
@Setter
public class UserCoversEntity extends BaseEntity {
    private String imageUrl;
    private String status;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
