package com.voca.vocaapp.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberVO {
    private int mno;
    private String email;
    private String nick;
    private int goal;
    private String lastLogin;
    private String regAt;
    private String modAt;
    private char isRemoved;
}
