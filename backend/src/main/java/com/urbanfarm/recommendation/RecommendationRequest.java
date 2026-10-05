package com.urbanfarm.recommendation;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RecommendationRequest(
    @NotBlank(message = "Please enter your location.")
    @Size(max = 120, message = "Location must be 120 characters or fewer.")
    String location,

    @NotBlank(message = "Please choose your growing space.")
    @Size(max = 80, message = "Space must be 80 characters or fewer.")
    String space,

    @NotBlank(message = "Please enter a crop or plant.")
    @Size(max = 100, message = "Crop name must be 100 characters or fewer.")
    String crop,

    @NotBlank(message = "Please enter your gardening question.")
    @Size(max = 1000, message = "Question must be 1000 characters or fewer.")
    String question
) {}
