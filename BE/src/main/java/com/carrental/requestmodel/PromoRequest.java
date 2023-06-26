package com.carrental.requestmodel;

import javax.persistence.Column;
import java.util.Date;
import lombok.Data;

@Data
public class PromoRequest {
    private String title;
    private String content;
    private int quantity;
    private int discountPercent;
    private Date startDate;
    private Date endDate;
}
