package com.voca.vocaapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class VocaAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(VocaAppApplication.class, args);
	}

}
