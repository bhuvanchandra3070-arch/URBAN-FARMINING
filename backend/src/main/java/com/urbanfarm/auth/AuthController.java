package com.urbanfarm.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:8080"})
public class AuthController {
    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public record RegisterRequest(
        @NotBlank(message = "Name is required") String name,
        @NotBlank(message = "Email is required") @Email(message = "Invalid email format") String email,
        @NotBlank(message = "Password is required") String password,
        String role
    ) {}

    public record LoginRequest(
        @NotBlank(message = "Email is required") String email,
        @NotBlank(message = "Password is required") String password
    ) {}

    public record AuthResponse(
        Long id,
        String name,
        String email,
        String role,
        String token,
        String message
    ) {}

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (request.email() == null || request.email().isBlank() || !request.email().contains("@")) {
            return ResponseEntity.badRequest().body(Map.of("message", "Please enter a valid email address."));
        }
        if (request.password() == null || request.password().length() < 4) {
            return ResponseEntity.badRequest().body(Map.of("message", "Password must be at least 4 characters."));
        }
        if (userRepository.existsByEmailIgnoreCase(request.email().trim())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("message", "An account with this email already exists."));
        }

        UserRecord user = new UserRecord(
            request.name().trim(),
            request.email().trim(),
            request.password(),
            request.role() != null ? request.role() : "ROLE_GROWER"
        );
        UserRecord saved = userRepository.save(user);

        // Generate synthetic session token for demo/student evaluation
        String token = "urbanfarm_token_" + saved.getId() + "_" + System.currentTimeMillis();

        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(
            saved.getId(),
            saved.getName(),
            saved.getEmail(),
            saved.getRole(),
            token,
            "Account registered successfully!"
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (request.email() == null || request.password() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email and password are required."));
        }

        return userRepository.findByEmailIgnoreCase(request.email().trim())
            .map(user -> {
                if (user.getPassword().equals(request.password())) {
                    String token = "urbanfarm_token_" + user.getId() + "_" + System.currentTimeMillis();
                    return ResponseEntity.ok(new AuthResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole(),
                        token,
                        "Login successful. Welcome back, " + user.getName() + "!"
                    ));
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Incorrect password. Please try again."));
                }
            })
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", "No account found with this email. Please register first.")));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestParam(name = "email", required = false) String email) {
        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email parameter required"));
        }
        return userRepository.findByEmailIgnoreCase(email.trim())
            .map(user -> ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "role", user.getRole(),
                "createdAt", user.getCreatedAt()
            )))
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", "User not found")));
    }
}
