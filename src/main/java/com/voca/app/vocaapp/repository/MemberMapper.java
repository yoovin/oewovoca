package com.voca.app.vocaapp.repository;

import org.apache.ibatis.annotations.Mapper;

import com.voca.app.vocaapp.domain.MemberVO;

@Mapper
public interface MemberMapper {
    public MemberVO login(MemberVO mvo);
    public MemberVO selectOneFromMno(int mno);
    public int lastLogin(String email);
}
