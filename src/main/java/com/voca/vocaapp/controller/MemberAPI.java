package com.voca.vocaapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.voca.vocaapp.domain.MemberVO;
import com.voca.vocaapp.service.MemberService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Slf4j
@RestController
@RequestMapping("/member")
public class MemberAPI {
    
    @Autowired
    private MemberService msv;

    @PostMapping(value="/login")
    public MemberVO login(@RequestBody MemberVO mvo) {
        log.info("MemberVO > login > POST");
        return msv.login(mvo);
    }
    
}
