package com.carrental.entity;


import com.carrental.enums.RepeatedCalendarPriority;
import com.carrental.enums.RepeatedCalendarType;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "repeated_calendar")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RepeatedCalendarEntity extends BaseEntity {
    private String value;
    @Enumerated(EnumType.ORDINAL)
    private RepeatedCalendarType type;
    private Date startDate;
    private Date endDate;
    @Enumerated(EnumType.ORDINAL)
    private RepeatedCalendarPriority priority;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id")
    private CarEntity car;
}
