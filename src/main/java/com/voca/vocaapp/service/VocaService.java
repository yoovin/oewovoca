package com.voca.vocaapp.service;

import java.util.List;

import com.voca.vocaapp.domain.MarkDTO;
import com.voca.vocaapp.domain.TodayDTO;
import com.voca.vocaapp.domain.VocaVO;

public interface VocaService {
    public TodayDTO getTodayList(int mno);
    public int marking(MarkDTO mdto);
    public TodayDTO getHistoryList(int mno, String regAt);
    public List<String> getMeans();
    
}
