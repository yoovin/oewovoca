package com.voca.vocaapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.voca.vocaapp.domain.MemberVO;
import com.voca.vocaapp.repository.MemberMapper;

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
