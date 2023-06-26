package com.carrental.entity;

import com.carrental.enums.CarStatus;
import lombok.*;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "car")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarEntity extends BaseEntity implements Serializable {
    //    @EmbeddedId
//    private CarId ids;
    private String plate;
    private String description;
    private Integer yearOfManufacture;
    private Integer seats;
    private String color;
    private String fuel;
    private Double fuelConsumption;
    private String transmission;
    private String policies;
    private Boolean isFastRent;
    @Enumerated(EnumType.ORDINAL)
    private CarStatus status;

    @Transient
    private String serviceType;

    @OneToOne(targetEntity = ServiceFeeEntity.class, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id")
    private ServiceFeeEntity service;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "model_id")
    private ModelEntity model;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id")
    private BrandEntity brand;

    @OneToMany(mappedBy = "cars", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Collection<FeatureEntity> features;

    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Collection<FavoriteCarEntity> favorites;

    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Collection<CarRatingEntity> ratings;

    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Collection<CarRentalEntity> rentals;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    private DeliveryAddressEntity address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private UserEntity user;

    @OneToMany(mappedBy = "car", targetEntity = CarImagesEntity.class, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CarImagesEntity> images;

    @OneToMany(mappedBy = "car", fetch = FetchType.LAZY)
    private List<RepeatedCalendarEntity> repeatedCalendars;

    private Double avgRating;


    @PostLoad
    public void setAvgRating() {
        if (null != this.ratings && this.ratings.size() > 0) {
            List<CarRatingEntity> ratings = new ArrayList<>(this.ratings);
            double totalRatingPoint = 0;
            for (CarRatingEntity rating : ratings) {
                totalRatingPoint += rating.getRating();
            }
            this.avgRating = totalRatingPoint / ratings.size();
        } else {
            this.avgRating = 0.0;
        }
        this.serviceType = this.service.getServiceType().getTravelType().getCode();
    }
}
