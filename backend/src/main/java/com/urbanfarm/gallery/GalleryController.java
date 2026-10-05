package com.urbanfarm.gallery;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/gallery")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:8080"})
public class GalleryController {
    private final GalleryRepository repository;

    public GalleryController(GalleryRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<GalleryRecord> getAll() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    public record CreateGalleryRequest(
        String authorName,
        String location,
        String cropTitle,
        String description,
        String imageUrl
    ) {}

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public GalleryRecord create(@RequestBody CreateGalleryRequest request) {
        String author = (request.authorName() == null || request.authorName().isBlank()) ? "Anonymous Urban Grower" : request.authorName().trim();
        String loc = (request.location() == null || request.location().isBlank()) ? "Terrace Garden" : request.location().trim();
        String crop = (request.cropTitle() == null || request.cropTitle().isBlank()) ? "Fresh Greens" : request.cropTitle().trim();
        String desc = (request.description() == null || request.description().isBlank()) ? "First harvest from balcony pots!" : request.description().trim();
        String img = (request.imageUrl() == null || request.imageUrl().isBlank()) 
            ? "https://images.unsplash.com/photo-1592417817098-8f3d6ef231fe?w=800&auto=format&fit=crop&q=80" 
            : request.imageUrl().trim();

        GalleryRecord record = new GalleryRecord(author, loc, crop, desc, img);
        return repository.save(record);
    }

    @PostMapping("/{id}/like")
    public GalleryRecord like(@PathVariable Long id) {
        GalleryRecord record = repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Gallery post not found"));
        record.incrementLikes();
        return repository.save(record);
    }
}
