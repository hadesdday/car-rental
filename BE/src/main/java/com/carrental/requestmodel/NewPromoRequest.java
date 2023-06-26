package com.carrental.requestmodel;

import lombok.Data;

import javax.persistence.Column;
import java.util.Date;
import java.util.List;

@Data
public class NewPromoRequest {
    private String title;
    private List<String> contents;
    private int quantity;
    private double maxPrice;
    private int discountPercent;
    private Date startDate;
    private Date endDate;
}
