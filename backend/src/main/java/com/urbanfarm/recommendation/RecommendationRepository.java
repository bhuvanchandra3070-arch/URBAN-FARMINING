package com.urbanfarm.recommendation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecommendationRepository extends JpaRepository<RecommendationRecord, Long> {
    List<RecommendationRecord> findAllByOrderByCreatedAtDesc();
    List<RecommendationRecord> findByCropContainingIgnoreCaseOrLocationContainingIgnoreCaseOrderByCreatedAtDesc(String crop, String location);
}

