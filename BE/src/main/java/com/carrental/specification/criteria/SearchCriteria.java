package com.carrental.specification.criteria;

import lombok.Data;

@Data
public class SearchCriteria {
    private String key;
    private Object value;
    private String operator;

    public SearchCriteria(String key, Object value, String operator) {
        this.key = key;
        this.value = value;
        this.operator = operator;
    }
}
