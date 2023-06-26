package com.carrental.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "notification_user")
@Getter
@Setter
public class NotificationUser extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "notification_id")
    private NotificationEntity notification;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private Boolean isSeen;
}
