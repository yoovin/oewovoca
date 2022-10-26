package com.voca.vocaapp.service;

import java.util.List;

import com.voca.vocaapp.domain.CalendarDTO;
import com.voca.vocaapp.domain.MemberVO;

public interface MemberService {
    public int register(MemberVO mvo);
    public MemberVO login(MemberVO mvo);
    public List<CalendarDTO> getCalendar(int mno, int year, int month);
    public int modify(MemberVO mvo);
    public int remove(int mno);
}
