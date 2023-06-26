package com.carrental.dto;

import com.carrental.enums.StandardStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class PromoDTO {
    private Long id;
    private String title;
    private String content;
    private List<String> contents;
    private int quantity;
    private double maxPrice;
    private double discountPercent;
    private StandardStatus status;
    private Date startDate;
    private Date endDate;
}
