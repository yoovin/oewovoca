package com.voca.app.vocaapp.service;

import com.voca.app.vocaapp.domain.MarkDTO;
import com.voca.app.vocaapp.domain.TodayDTO;

public interface VocaService {
    public TodayDTO getTodayList(int mno);
    public int marking(MarkDTO mdto);
    public TodayDTO getHistoryList(int mno, String regAt);
    
}
