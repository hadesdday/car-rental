package com.carrental.utils;

import com.carrental.entity.CarEntity;
import com.carrental.entity.PromoEntity;

public class PriceUtils {
    public static Double computeRentalPrice(Long startTime, Long endTime, CarEntity car, PromoEntity promo){
        Double defaultPrice = car.getService().getDefaultPrice();
        Long days = (endTime - startTime) / 86400000;
        System.out.println(endTime);
        System.out.println(startTime);
        days = (endTime - startTime) % 86400000 > 0? days + 1: days;
        Double newDefaultPrice;
        Double rentalFee;
        Integer discount = 0;
        if(days > 7 && days <= 31){
            discount = car.getService().getDiscountByWeek();
        }else if(days > 31){
            discount = car.getService().getDiscountByMonth();
        }
        Double discountPrice = 0.0;
        if(promo != null){
            if(promo != null){
                discountPrice = defaultPrice * promo.getDiscountPercent() / 100;
            }
        }
        newDefaultPrice = defaultPrice * (100 - discount) / 100;
        System.out.println(newDefaultPrice);
        Double insuranceFee = defaultPrice * 0.12;
        Double serviceFee = insuranceFee;
        rentalFee = newDefaultPrice + insuranceFee + serviceFee - discountPrice;
        System.out.println(rentalFee);
        Double total = days * rentalFee;
        return total;
    }
}
