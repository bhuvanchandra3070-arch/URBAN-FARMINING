package com.urbanfarm.auth;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class UserDataLoader implements CommandLineRunner {
    private final UserRepository userRepository;

    public UserDataLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        if (!userRepository.existsByEmailIgnoreCase("grower@urbanfarm.com")) {
            userRepository.save(new UserRecord(
                "Priya Sharma",
                "grower@urbanfarm.com",
                "password123",
                "ROLE_GROWER"
            ));
        }

        if (!userRepository.existsByEmailIgnoreCase("agronomist@urbanfarm.com")) {
            userRepository.save(new UserRecord(
                "Dr. Ramesh Reddy",
                "agronomist@urbanfarm.com",
                "admin123",
                "ROLE_AGRONOMIST"
            ));
        }
    }
}
