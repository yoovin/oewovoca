package com.voca.vocaapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.voca.vocaapp.domain.CalendarDTO;
import com.voca.vocaapp.domain.MemberVO;
import com.voca.vocaapp.service.MemberService;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Slf4j
@RestController
@RequestMapping("/member")
public class MemberAPI {
    
    @Autowired
    private MemberService msv;

    @PostMapping("/login")
    public MemberVO login(@RequestBody MemberVO mvo) {
        log.info("MemberAPI > login > POST");
        return msv.login(mvo);
    }
    
    @PostMapping("/")
    public int register(@RequestBody MemberVO mvo) {
        log.info("MemberAPI > register > POST");
        return msv.register(mvo);
    }

    @PutMapping("/{mno}")
    public int modify(@RequestBody MemberVO mvo) {
        log.info("MemberAPI > modify > PUT");
        return msv.modify(mvo);
    }

    @DeleteMapping("/{mno}")
    public int remove(@PathVariable int mno) {
        log.info("MemberAPI > remove > DELETE");
        return msv.remove(mno);
    }

    @GetMapping("/calendar/{mno}/{year}/{month}")
    public List<CalendarDTO> spreadCalendar(@PathVariable int mno, @PathVariable int year, @PathVariable int month) {
        log.info("MemberAPI > calendar > GET");
        return msv.getCalendar(mno, year, month);
    }
}
