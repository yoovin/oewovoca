package com.voca.vocaapp.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.StringTokenizer;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.voca.vocaapp.domain.TodayDTO;
import com.voca.vocaapp.domain.HistoryVO;
import com.voca.vocaapp.domain.MarkDTO;
import com.voca.vocaapp.domain.MemberVO;
import com.voca.vocaapp.domain.SearchDTO;
import com.voca.vocaapp.domain.TodayVocaDTO;
import com.voca.vocaapp.domain.VocaDTO;
import com.voca.vocaapp.domain.VocaHistoryVO;
import com.voca.vocaapp.domain.VocaVO;
import com.voca.vocaapp.repository.HistoryMapper;
import com.voca.vocaapp.repository.MemberMapper;
import com.voca.vocaapp.repository.VocaHistoryMapper;
import com.voca.vocaapp.repository.VocaMapper;

@Service
public class VocaServiceImpl implements VocaService {

    @Autowired
    private MemberMapper memberMapper;

    @Autowired
    private VocaMapper vocaMapper;

    @Autowired
    private HistoryMapper historyMapper;

    @Autowired
    private VocaHistoryMapper vocaHistoryMapper;

    @Override
    @Transactional
    public TodayDTO getTodayList(int mno) {
        HistoryVO hvo = historyMapper.selectTodayFromMno(mno);
        if (hvo == null) {
            MemberVO mvo = memberMapper.selectOneFromMno(mno);
            int isUp = historyMapper.insertToday(mno);
            if (isUp > 0) {
                hvo = historyMapper.selectTodayFromMno(mno);
                SearchDTO sdto = new SearchDTO();
                sdto.setMno(mno);
                sdto.setGoal(mvo.getGoal() / 2);
                List<VocaDTO> totalVocaList = new ArrayList<>();
                List<VocaDTO> oldVdtoList = vocaMapper.selectVocaHistoryList(sdto);
                for (VocaDTO vdto : oldVdtoList) {
                    vdto.setNew(false);
                    totalVocaList.add(vdto);
                }
                sdto.setGoal(mvo.getGoal() - oldVdtoList.size());
                List<VocaDTO> newVdtoList = vocaMapper.selectRandList(sdto);
                for (VocaDTO vdto : newVdtoList) {
                    vdto.setNew(true);
                    totalVocaList.add(vdto);
                }
                Collections.shuffle(totalVocaList);
                for (VocaDTO vdto : totalVocaList) {
                    vocaHistoryMapper.insert(new VocaHistoryVO(mno, vdto.getVno(), hvo.getHno(), vdto.isNew()));
                }
            } else {
                return null;
            }
        }
        List<VocaDTO> vdtoList = vocaMapper.selectVocaListFromHno(hvo.getHno());
        return new TodayDTO(hvo, vocadtoParser(vdtoList));
    }
    
    @Override
    public TodayDTO getHistoryList(int mno, String regAt) {
        HistoryVO hvo = historyMapper.selectHistoryFromHvo(new HistoryVO(mno, regAt));
        if (hvo != null) {
            List<VocaDTO> vdtoList = vocaMapper.selectVocaListFromHno(hvo.getHno());
            return new TodayDTO(hvo, vocadtoParser(vdtoList));
        } else {
            return null;
        }
    }

    @Override
    @Transactional
    public int marking(MarkDTO mdto) {
        int isUp = historyMapper.updateChallenge(new HistoryVO(mdto.getHno(), true));
        for (long vno : mdto.getCorrectList()) {
            if (isUp > 0) {
                isUp *= vocaHistoryMapper.updateCorrect(new VocaHistoryVO(mdto.getHno(), vno, true));
            }
        }
        if (isUp > 0 && mdto.getWrongList() != null) {
            for (long vno : mdto.getWrongList()) {
                if (isUp > 0) {
                    isUp *= vocaHistoryMapper.updateCorrect(new VocaHistoryVO(mdto.getHno(), vno, false));
                }
            }
        }
        return isUp;
    }

    private List<TodayVocaDTO> vocadtoParser(List<VocaDTO> vdtoList) {
        List<TodayVocaDTO> vocadtoList = new ArrayList<>();
        for (VocaDTO vdto : vdtoList) {
            List<String> meanList = new ArrayList<>();
            StringTokenizer stz = new StringTokenizer(vdto.getMean(), "//");
            while (stz.hasMoreTokens()) {
                meanList.add(stz.nextToken());
            }
            vocadtoList.add(new TodayVocaDTO(vdto, meanList));
        }
        return vocadtoList;
    }

    @Override
    public List<String> getMeans() {
        List<VocaVO> vvoList = vocaMapper.selectMeanList();
        List<String> meanList = new ArrayList<>();
        for (VocaVO vvo : vvoList) {
            StringTokenizer stz = new StringTokenizer(vvo.getMean(), "//");
            while (stz.hasMoreTokens()) {
                meanList.add(stz.nextToken());
            }
        }
        return meanList.stream().distinct().collect(Collectors.toList());
    }
}
