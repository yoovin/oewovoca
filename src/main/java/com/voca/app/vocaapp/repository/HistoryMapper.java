package com.voca.app.vocaapp.repository;

import org.apache.ibatis.annotations.Mapper;

import com.voca.app.vocaapp.domain.HistoryVO;

@Mapper
public interface HistoryMapper {
    public int insertToday(int mno);
    public HistoryVO selectTodayFromMno(int mno);
    public HistoryVO selectHistoryFromHvo(HistoryVO hvo);
    public int updateChallenge(HistoryVO hvo);
}
