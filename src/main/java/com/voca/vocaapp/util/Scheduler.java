package com.voca.vocaapp.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.voca.vocaapp.repository.HistoryMapper;
import com.voca.vocaapp.repository.MemberMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class Scheduler {
    
    @Autowired
    private MemberMapper memberMapper;

    @Scheduled(cron = "30 00 00 * * *", zone = "Asia/Seoul")
    public void chainResetScheduler() {
        log.info("Scheduler > chainResetScheduler > {}",
                    memberMapper.updateChainReset() > 0 ? "OK" : "Fail");
    }
}
