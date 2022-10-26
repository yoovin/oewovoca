package com.voca.vocaapp.repository;

import org.apache.ibatis.annotations.Mapper;

import com.voca.vocaapp.domain.MemberVO;

@Mapper
public interface MemberMapper {
    public int insert(MemberVO mvo);
    public MemberVO login(MemberVO mvo);
    public MemberVO selectOneFromMno(int mno);
    public int updateMemberFromMno(MemberVO mvo);
    public int lastLogin(String email);
    public int deleteFromMno(int mno);
}
