package com.urbanfarm.recommendation;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(name = "recommendation_requests")
public class RecommendationRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String location;

    @Column(nullable = false, length = 80)
    private String space;

    @Column(nullable = false, length = 100)
    private String crop;

    @Column(nullable = false, length = 1000)
    private String question;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String responseJson;

    @Column(nullable = false)
    private Instant createdAt;

    protected RecommendationRecord() {}

    public RecommendationRecord(
        String location,
        String space,
        String crop,
        String question,
        String responseJson
    ) {
        this.location = location;
        this.space = space;
        this.crop = crop;
        this.question = question;
        this.responseJson = responseJson;
        this.createdAt = Instant.now();
    }

    public Long getId() { return id; }
    public String getLocation() { return location; }
    public String getSpace() { return space; }
    public String getCrop() { return crop; }
    public String getQuestion() { return question; }
    public String getResponseJson() { return responseJson; }
    public Instant getCreatedAt() { return createdAt; }
}
