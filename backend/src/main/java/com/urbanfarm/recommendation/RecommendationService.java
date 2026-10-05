package com.urbanfarm.recommendation;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class RecommendationService {
    private final RecommendationRepository repository;
    private final ObjectMapper mapper;

    public RecommendationService(
        RecommendationRepository repository,
        ObjectMapper mapper
    ) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Transactional
    public RecommendationResponse recommend(RecommendationRequest request) {
        String crop = request.crop().trim();
        String location = request.location().trim();
        String space = request.space().trim();
        String question = request.question().trim();

        List<RecommendationResponse.AdviceSection> advice = generateAdvice(crop, location, space, question);

        try {
            String responseJson = mapper.writeValueAsString(advice);
            RecommendationRecord saved = repository.save(new RecommendationRecord(
                location,
                space,
                crop,
                question,
                responseJson
            ));

            return toResponse(saved, advice);
        } catch (JsonProcessingException e) {
            throw new IllegalStateException("Could not serialize recommendations.", e);
        }
    }

    @Transactional(readOnly = true)
    public List<RecommendationResponse> getAll() {
        return repository.findAllByOrderByCreatedAtDesc()
            .stream()
            .map(this::toResponseFromRecord)
            .toList();
    }

    @Transactional(readOnly = true)
    public List<RecommendationResponse> search(String query) {
        if (query == null || query.isBlank()) {
            return getAll();
        }
        String clean = query.trim();
        return repository.findByCropContainingIgnoreCaseOrLocationContainingIgnoreCaseOrderByCreatedAtDesc(clean, clean)
            .stream()
            .map(this::toResponseFromRecord)
            .toList();
    }

    private RecommendationResponse toResponseFromRecord(RecommendationRecord record) {
        try {
            List<RecommendationResponse.AdviceSection> advice = mapper.readValue(
                record.getResponseJson(),
                new TypeReference<List<RecommendationResponse.AdviceSection>>() {}
            );
            return toResponse(record, advice);
        } catch (JsonProcessingException e) {
            return toResponse(record, List.of());
        }
    }

    private RecommendationResponse toResponse(RecommendationRecord record, List<RecommendationResponse.AdviceSection> advice) {
        return new RecommendationResponse(
            record.getId(),
            record.getLocation(),
            record.getSpace(),
            record.getCrop(),
            record.getQuestion(),
            advice,
            "Localized recommendations tailored for " + record.getLocation() + " in " + record.getSpace().toLowerCase()
                + ". Consult local seasonal planting calendars for microclimate nuances.",
            record.getCreatedAt()
        );
    }

    private List<RecommendationResponse.AdviceSection> generateAdvice(String crop, String location, String space, String question) {
        String spaceLower = space.toLowerCase();
        String cropLower = crop.toLowerCase();

        // 1. Crops
        String cropAdvice;
        if (spaceLower.contains("windowsill") || spaceLower.contains("indoor")) {
            cropAdvice = "For " + space + ", dwarf or compact varieties of " + crop + " perform best. Ensure they receive at least 5-6 hours of bright light or supplement with an LED grow light.";
        } else if (spaceLower.contains("balcony") || spaceLower.contains("rooftop")) {
            cropAdvice = "On a " + space + ", " + crop + " can thrive in containers. Choose bush or determinate varieties to minimize wind resistance and trellis securely.";
        } else {
            cropAdvice = crop + " suits " + space + " well in " + location + ". Pair with compatible companion plants to maximize yield and biodiversity.";
        }

        // 2. Soil
        String soilAdvice;
        if (spaceLower.contains("indoor") || spaceLower.contains("windowsill") || spaceLower.contains("pots") || spaceLower.contains("balcony")) {
            soilAdvice = "Use a lightweight, sterile potting mix containing perlite, coco coir, and vermiculite. Avoid heavy garden soil which compacts in containers. Add 20% well-aged compost for slow-release nutrients.";
        } else {
            soilAdvice = "Enrich native garden soil with 2-3 inches of organic compost and well-rotted leaf mold. Aim for a slightly acidic to neutral pH (6.0 - 6.8) suitable for " + crop + ".";
        }

        // 3. Seeds & Planting
        String seedsAdvice = "Sow seeds at a depth approximately 2-3 times their diameter. Maintain consistent moisture during germination (7-14 days). Thin seedlings early so each " + crop + " plant has adequate airflow and root room.";

        // 4. Watering
        String wateringAdvice;
        if (spaceLower.contains("balcony") || spaceLower.contains("rooftop")) {
            wateringAdvice = "Elevated spaces dry out quickly due to sun and wind. Water deeply in the early morning until water runs out the drainage holes. Mulch surface soil with straw or woodchips to retain moisture.";
        } else if (spaceLower.contains("windowsill") || spaceLower.contains("indoor")) {
            wateringAdvice = "Check soil moisture with your finger: water only when the top 1 inch feels dry. Empty drainage saucers after 30 minutes to prevent root rot.";
        } else {
            wateringAdvice = "Apply 1 to 1.5 inches of water per week at soil level via drip or soaker hoses. Avoid wetting leaves to prevent fungal infections.";
        }

        // 5. Pests
        String pestsAdvice = "Common urban pests for " + crop + " include aphids, spider mites, and whiteflies. Inspect leaf undersides weekly. Treat early with neem oil spray, horticultural insecticidal soap, or companion plant with marigolds and basil.";

        // 6. Seasonal Care
        String seasonalAdvice = "In " + location + ", monitor seasonal frost dates and summer heatwaves. Provide afternoon shade netting if temperatures exceed 32°C (90°F) and shield containers from harsh prevailing winds.";

        return List.of(
            new RecommendationResponse.AdviceSection("What to grow", cropAdvice, "🌱"),
            new RecommendationResponse.AdviceSection("Soil", soilAdvice, "🪴"),
            new RecommendationResponse.AdviceSection("Seeds & planting", seedsAdvice, "🌾"),
            new RecommendationResponse.AdviceSection("Watering", wateringAdvice, "💧"),
            new RecommendationResponse.AdviceSection("Pests", pestsAdvice, "🐞"),
            new RecommendationResponse.AdviceSection("Seasonal care", seasonalAdvice, "☀️")
        );
    }
}

