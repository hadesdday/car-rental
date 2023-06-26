package com.carrental.constance;

import java.time.Year;

public class SystemConstance {
    public static final String APPLICATION_NAME = "Rental Car";
    public static final long EXPIRATION_TIME = 86400000;
    public static final long REFRESH_TIME = 90000000;
    public static final String SECRET_KEY = "huynhgiahuyitnlu";
    public static final String TOKEN_PREFIX = "Bearer";

    public static final String MAX_SEAT_ALLOWED = "20";
    public static final String MAX_YEAR_ALLOWED = String.valueOf(Year.now().getValue());
    public static final String MAX_PRICE_ALLOWED = "5000000";
    public static final int MAX_OVER_LIMIT_FEE_ALLOWED = 5000;
}
