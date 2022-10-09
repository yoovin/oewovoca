package com.voca.app.vocaapp.repository;

import org.apache.ibatis.annotations.Mapper;

import com.voca.app.vocaapp.domain.VocaHistoryVO;

@Mapper
public interface VocaHistoryMapper {
    public int insert(VocaHistoryVO vhvo);
    public int updateCorrect(VocaHistoryVO vhvo);
}
