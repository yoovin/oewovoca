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
    private int goal;

    public HistoryVO(int mno, String regAt) {
        this.mno = mno;
        this.regAt = regAt;
    }

    public HistoryVO(long hno, int correct, boolean challenge) {
        this.hno = hno;
        this.correct = correct;
        this.challenge = challenge;
    }
}
