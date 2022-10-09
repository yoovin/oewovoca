package com.voca.app.vocaapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.voca.app.vocaapp.domain.MarkDTO;
import com.voca.app.vocaapp.domain.TodayDTO;
import com.voca.app.vocaapp.service.VocaService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/voca")
public class VocaAPI {
    
    @Autowired
    private VocaService vsv;

    @GetMapping("/today/{mno}")
    public TodayDTO spreadToday(@PathVariable int mno) {
        log.info("VocaAPI > spreadToday > GET");
        return vsv.getTodayList(mno);
    }
    
    @GetMapping("/today/{mno}/{regAt}")
    public TodayDTO spreadHistory(@PathVariable int mno, @PathVariable String regAt) {
        log.info("VocaAPI > spreadHistory > GET");
        return vsv.getHistoryList(mno, regAt);
    }

    @PutMapping("/today/{hno}")
    public int mark(@RequestBody MarkDTO mdto) {
        log.info("VocaAPI > mark > PUT");
        return vsv.marking(mdto);
    }
}
