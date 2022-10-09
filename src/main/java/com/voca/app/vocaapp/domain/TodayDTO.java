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
public class TodayDTO {
    private HistoryVO hvo;
    private List<TodayVocaDTO> vocaList;
}
