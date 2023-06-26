package com.carrental.responsemodel;

import lombok.Data;

@Data
public class APIResponse<T> {
    private T data;
    private String message;
    private int statusCode;

    public APIResponse(T data, String message, int statusCode) {
        this.data = data;
        this.message = message;
        this.statusCode = statusCode;
    }
}
