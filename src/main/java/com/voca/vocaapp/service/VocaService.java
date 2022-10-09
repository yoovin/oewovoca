package com.voca.vocaapp.service;

import com.voca.vocaapp.domain.MarkDTO;
import com.voca.vocaapp.domain.TodayDTO;

public interface VocaService {
    public TodayDTO getTodayList(int mno);
    public int marking(MarkDTO mdto);
    public TodayDTO getHistoryList(int mno, String regAt);
    
}
