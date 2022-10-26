package com.voca.vocaapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.voca.vocaapp.domain.CalendarDTO;
import com.voca.vocaapp.domain.MemberVO;
import com.voca.vocaapp.domain.SearchDTO;
import com.voca.vocaapp.repository.HistoryMapper;
import com.voca.vocaapp.repository.MemberMapper;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberMapper memberMapper;

    @Autowired
    private HistoryMapper historyMapper;

    @Override
    public int register(MemberVO mvo) {
        return memberMapper.insert(mvo);
    }

    @Override
    @Transactional
    public MemberVO login(MemberVO mvo) {
        MemberVO login = memberMapper.login(mvo);
        if (login != null) {
            memberMapper.lastLogin(mvo.getEmail());
        }
        return login;
    }

    @Override
    public int modify(MemberVO mvo) {
        return memberMapper.updateMemberFromMno(mvo);
    }

    @Override
    public List<CalendarDTO> getCalendar(int mno, int year, int month) {
        SearchDTO sdto = new SearchDTO();
        sdto.setMno(mno);
        sdto.setDate(year + "-" + month);
        return historyMapper.selectHistoryFromMonth(sdto);
    }

    @Override
    public int remove(int mno) {
        return memberMapper.deleteFromMno(mno);
    }

}
