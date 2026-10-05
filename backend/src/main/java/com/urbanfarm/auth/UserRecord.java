package com.urbanfarm.auth;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "users")
public class UserRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 120)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 50)
    private String role; // "ROLE_GROWER", "ROLE_AGRONOMIST", "ROLE_ADMIN"

    @Column(nullable = false)
    private Instant createdAt;

    protected UserRecord() {}

    public UserRecord(String name, String email, String password, String role) {
        this.name = name;
        this.email = email.toLowerCase().trim();
        this.password = password;
        this.role = role != null ? role : "ROLE_GROWER";
        this.createdAt = Instant.now();
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getRole() { return role; }
    public Instant getCreatedAt() { return createdAt; }

    public void setName(String name) { this.name = name; }
    public void setPassword(String password) { this.password = password; }
}
