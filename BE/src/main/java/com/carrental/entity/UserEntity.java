package com.carrental.entity;

import com.carrental.enums.Gender;
import com.carrental.enums.OAuthProvider;
import com.carrental.enums.Role;
import com.carrental.enums.UserStatus;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Entity
@Table(name = "user")
@Getter
@Setter
public class UserEntity extends BaseEntity {
    private String username;
    private String password;
    private String fullName;
    private String email;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    private Date dob;
    @Enumerated(EnumType.ORDINAL)
    private Gender gender;
    private String phone;
    @Enumerated(EnumType.ORDINAL)
    private UserStatus status;
    @Enumerated(EnumType.ORDINAL)
    private Role role;
    private OAuthProvider provider;

    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
    private Collection<CarRatingEntity> ratings;
    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
    private Collection<UserAvatarEntity> avatars;
    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
    private Collection<UserCoversEntity> covers;
    @OneToMany(mappedBy = "user")
    private Collection<FavoriteCarEntity> favorites;
    @OneToMany(mappedBy = "user")
    private Collection<NotificationUser> notificationUsers;
    @OneToMany(mappedBy = "user")
    private Collection<CarRentalEntity> rentals;
    @OneToMany(mappedBy = "user")
    private Collection<CarEntity> cars;
}
