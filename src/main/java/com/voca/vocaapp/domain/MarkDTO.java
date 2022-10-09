package com.voca.vocaapp.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MarkDTO {
    private long hno;
    private List<Long> correctList;
    private List<Long> wrongList;
}
