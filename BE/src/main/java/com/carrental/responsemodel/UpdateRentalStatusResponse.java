package com.carrental.responsemodel;

import com.carrental.enums.RentalStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateRentalStatusResponse {
    private Long id;
    private String modifiedBy;
    private RentalStatus status;
}