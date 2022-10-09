package com.voca.vocaapp.repository;

import org.apache.ibatis.annotations.Mapper;

import com.voca.vocaapp.domain.HistoryVO;

@Mapper
public interface HistoryMapper {
    public int insertToday(int mno);
    public HistoryVO selectTodayFromMno(int mno);
    public HistoryVO selectHistoryFromHvo(HistoryVO hvo);
    public int updateChallenge(HistoryVO hvo);
}
