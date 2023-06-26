package com.carrental.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "car_images")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarImagesEntity extends BaseEntity {
    private String imageUrl;
    private String status;
    private Boolean isThumbnail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id")
    private CarEntity car;
}
