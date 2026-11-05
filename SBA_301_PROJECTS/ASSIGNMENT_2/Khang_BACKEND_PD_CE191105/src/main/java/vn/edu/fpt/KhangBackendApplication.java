package vn.edu.fpt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KhangBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(KhangBackendApplication.class, args);
        System.out.println("==================================================================");
        System.out.println("FUNewsManagementSystem Backend is running on: http://localhost:8080");
        System.out.println("==================================================================");
    }
}

