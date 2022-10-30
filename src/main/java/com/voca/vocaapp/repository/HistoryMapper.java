package com.voca.vocaapp.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.voca.vocaapp.domain.CalendarDTO;
import com.voca.vocaapp.domain.HistoryVO;
import com.voca.vocaapp.domain.MemberVO;
import com.voca.vocaapp.domain.SearchDTO;

@Mapper
public interface HistoryMapper {
    public int insertToday(MemberVO mvo);
    public HistoryVO selectTodayFromMno(int mno);
    public HistoryVO selectOneFromHno(long hno);
    public HistoryVO selectHistoryFromHvo(HistoryVO hvo);
    public List<CalendarDTO> selectHistoryFromMonth(SearchDTO sdto);
    public int updateChallenge(HistoryVO hvo);
}
