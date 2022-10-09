package com.voca.app.vocaapp.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.voca.app.vocaapp.domain.SearchDTO;
import com.voca.app.vocaapp.domain.VocaDTO;

@Mapper
public interface VocaMapper {
    public List<VocaDTO> selectVocaHistoryList(SearchDTO sdto);
    public List<VocaDTO> selectVocaListFromHno(long hno);
    public List<VocaDTO> selectRandList(SearchDTO sdto);
}
