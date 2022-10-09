package com.voca.app.vocaapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.voca.app.vocaapp.domain.MemberVO;
import com.voca.app.vocaapp.repository.MemberMapper;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberMapper memberMapper;

    @Override
    @Transactional
    public MemberVO login(MemberVO mvo) {
        MemberVO login = memberMapper.login(mvo);
        if (login != null) {
            memberMapper.lastLogin(mvo.getEmail());
        }
        return login;
    }
    
}
