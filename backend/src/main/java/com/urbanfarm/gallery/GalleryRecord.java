package com.urbanfarm.gallery;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "community_gallery")
public class GalleryRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String authorName;

    @Column(nullable = false, length = 120)
    private String location;

    @Column(nullable = false, length = 100)
    private String cropTitle;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(nullable = false, length = 500)
    private String imageUrl;

    @Column(nullable = false)
    private int likes;

    @Column(nullable = false)
    private Instant createdAt;

    protected GalleryRecord() {}

    public GalleryRecord(String authorName, String location, String cropTitle, String description, String imageUrl) {
        this.authorName = authorName;
        this.location = location;
        this.cropTitle = cropTitle;
        this.description = description;
        this.imageUrl = imageUrl;
        this.likes = 0;
        this.createdAt = Instant.now();
    }

    public Long getId() { return id; }
    public String getAuthorName() { return authorName; }
    public String getLocation() { return location; }
    public String getCropTitle() { return cropTitle; }
    public String getDescription() { return description; }
    public String getImageUrl() { return imageUrl; }
    public int getLikes() { return likes; }
    public Instant getCreatedAt() { return createdAt; }

    public void incrementLikes() {
        this.likes++;
    }
}
