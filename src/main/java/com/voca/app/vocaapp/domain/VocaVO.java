package com.voca.app.vocaapp.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VocaVO {
    private long vno;
    private String origin;
    private String mean;
    private char lang;
    private String reg_at;
}
