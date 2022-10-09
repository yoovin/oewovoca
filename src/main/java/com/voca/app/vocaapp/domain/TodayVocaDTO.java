package com.voca.app.vocaapp.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TodayVocaDTO {
    private long vno;
    // private long vhno;
    private String origin;
    private List<String> meanList;
    // private char lang;
    private boolean correct;
    private boolean isNew;

    public TodayVocaDTO(VocaDTO vdto, List<String> meanList) {
        this.vno = vdto.getVno();
        this.origin = vdto.getOrigin();
        this.correct = vdto.isCorrect();
        this.meanList = meanList;
        // this.lang = vvo.getLang();
        this.isNew = vdto.isNew();
    }
}
