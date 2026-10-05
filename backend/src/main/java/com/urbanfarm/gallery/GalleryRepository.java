package com.urbanfarm.gallery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GalleryRepository extends JpaRepository<GalleryRecord, Long> {
    List<GalleryRecord> findAllByOrderByCreatedAtDesc();
}
