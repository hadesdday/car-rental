package com.carrental.model;

import lombok.Data;
import org.springframework.data.domain.PageRequest;

import java.lang.reflect.Constructor;

@Data
public class Paging {
    Integer page;
    Integer size;
}
