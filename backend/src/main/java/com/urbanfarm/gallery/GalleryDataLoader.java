package com.urbanfarm.gallery;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class GalleryDataLoader implements CommandLineRunner {
    private final GalleryRepository repository;

    public GalleryDataLoader(GalleryRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            repository.save(new GalleryRecord(
                "Ananya Sharma",
                "Bengaluru, Balcony",
                "Cherry Tomatoes & Basil",
                "Harvested 1.2 kg of sweet cherry tomatoes from 2 grow bags on my 4th floor balcony! Companion planting with basil kept aphids completely away.",
                "/images/ripe-tomatoes.webp"
            ));

            repository.save(new GalleryRecord(
                "Karthik Varma",
                "Hyderabad, Terrace",
                "Palak (Spinach) & Coriander",
                "Zero-chemical lush green spinach harvest using cocopeat + vermicompost (50:50) mix with weekly sour buttermilk spray.",
                "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&auto=format&fit=crop&q=80"
            ));

            repository.save(new GalleryRecord(
                "Sneha Reddy",
                "Visakhapatnam, Windowsill",
                "Aromatic Sweet Basil & Spearmint",
                "Lush organic sweet basil grown on our kitchen windowsill. Pinching flowers keeps the leaves tender, sweet, and aromatic every morning!",
                "/images/fresh-basil.webp"
            ));
        }
    }
}
