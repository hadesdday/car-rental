package com.carrental.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Collection;

@Entity
@Table(name = "notificaiton")
@Getter
@Setter
public class NotificationEntity extends BaseEntity {
    private String title;
    private String message;

    @OneToMany(mappedBy = "notification")
    private Collection<NotificationUser> notificationUsers;
}
