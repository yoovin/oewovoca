package com.voca.vocaapp.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HistoryVO {
    private long hno;
    private int mno;
    private String regAt;
    private int correct;
    private boolean challenge;

    public HistoryVO(int mno, String regAt) {
        this.mno = mno;
        this.regAt = regAt;
    }

    public HistoryVO(long hno, boolean challenge) {
        this.hno = hno;
        this.challenge = challenge;
    }
}
