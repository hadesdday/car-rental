package com.carrental.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "jwt")
@Data
public class JWTEntity extends BaseEntity{

    @Column(columnDefinition = "TEXT")
    private String token;
    @Column
    private Date tokenExpirationDate;


    public JWTEntity(String token, Date tokenExpirationDate) {
        this.token = token;
        this.tokenExpirationDate = tokenExpirationDate;
    }


    public JWTEntity() {

    }
}
