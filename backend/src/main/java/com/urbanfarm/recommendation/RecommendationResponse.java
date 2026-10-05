package com.urbanfarm.recommendation;

import java.time.Instant;
import java.util.List;

public record RecommendationResponse(
    Long id,
    String location,
    String space,
    String crop,
    String question,
    List<AdviceSection> recommendations,
    String note,
    Instant createdAt
) {
    public record AdviceSection(
        String title,
        String advice,
        String icon
    ) {}
}
