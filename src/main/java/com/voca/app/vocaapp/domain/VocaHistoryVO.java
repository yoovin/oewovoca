package com.voca.app.vocaapp.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VocaHistoryVO {
    private long vhno;
    private int mno;
    private long vno;
    private long hno;
    private boolean isNew;
    private boolean correct;
    private String regAt;


    public VocaHistoryVO(long hno, long vno, boolean correct) {
        this.hno = hno;
        this.vno = vno;
        this.correct = correct;
    }

    public VocaHistoryVO(int mno, long vno, long hno, boolean isNew) {
        this.mno = mno;
        this.vno = vno;
        this.hno = hno;
        this.isNew = isNew;
    }

}
