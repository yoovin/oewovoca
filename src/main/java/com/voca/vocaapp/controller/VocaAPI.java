package com.voca.vocaapp.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.voca.vocaapp.domain.MarkDTO;
import com.voca.vocaapp.domain.TodayDTO;
import com.voca.vocaapp.service.VocaService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/voca")
public class VocaAPI {
    
    @Autowired
    private VocaService vsv;

    @GetMapping("/today/{mno}/{regAt}")
    public TodayDTO spreadToday(@PathVariable("mno") int mno, @PathVariable("regAt") String regAt) {
        log.info("VocaAPI > spreadToday > GET");
        LocalDate today = LocalDate.now();
        DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        if (regAt.equals(today.format(df))) {
            return vsv.getTodayList(mno);
        } else {
            return vsv.getHistoryList(mno, regAt);
        }
    }
    
    @PutMapping("/today/{hno}")
    public int mark(@RequestBody MarkDTO mdto) {
        log.info("VocaAPI > mark > PUT");
        return vsv.marking(mdto);
    }

    // @GetMapping("/history/{mno}/{regAt}")
    // public TodayDTO spreadHistory(@PathVariable int mno, @PathVariable String regAt) {
    //     log.info("VocaAPI > spreadHistory > GET");
    //     return vsv.getHistoryList(mno, regAt);
    // }

    @GetMapping("/means")
    public List<String> spreadMeans() {
        return vsv.getMeans();
    }
    
}
