package com.voca.vocaapp.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.voca.vocaapp.domain.SearchDTO;
import com.voca.vocaapp.domain.VocaDTO;
import com.voca.vocaapp.domain.VocaVO;

@Mapper
public interface VocaMapper {
    public List<VocaDTO> selectVocaHistoryList(SearchDTO sdto);
    public List<VocaDTO> selectVocaListFromHno(long hno);
    public List<VocaDTO> selectRandList(SearchDTO sdto);
    public List<VocaVO> selectMeanList();
}
