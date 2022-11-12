package com.voca.vocaapp.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CalendarDTO {
    private long hno;
    private String date;
    private boolean challenge;
    private int correct;
    private int goal;
}
