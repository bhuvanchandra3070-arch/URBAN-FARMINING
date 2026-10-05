export const codeStudioData = [
  {
    id: "spring-controller",
    title: "RecommendationController.java",
    category: "Spring Boot 3.4 REST API",
    language: "java",
    code: `package com.urbanfarm.recommendation;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:8080"})
public class RecommendationController {
    private final RecommendationService service;

    public RecommendationController(RecommendationService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RecommendationResponse create(@Valid @RequestBody RecommendationRequest request) {
        return service.recommend(request);
    }

    @GetMapping
    public List<RecommendationResponse> getAll() {
        return service.getAll();
    }

    @GetMapping("/search")
    public List<RecommendationResponse> search(@RequestParam(name = "q", required = false) String query) {
        return service.search(query);
    }
}`
  },
  {
    id: "spring-entity",
    title: "RecommendationRecord.java",
    category: "JPA / Hibernate Entity",
    language: "java",
    code: `package com.urbanfarm.recommendation;

import jakarta.persistence.*;
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

    public RecommendationRecord(String location, String space, String crop, String question, String responseJson) {
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
}`
  },
  {
    id: "mysql-schema",
    title: "schema-mysql.sql",
    category: "MySQL 8.0 DDL Schema",
    language: "sql",
    code: `-- Urban Farming Community Knowledge Hub - MySQL 8.0 Production DDL Schema
CREATE DATABASE IF NOT EXISTS \`urbanfarm\` 
  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE \`urbanfarm\`;

CREATE TABLE IF NOT EXISTS \`recommendation_requests\` (
  \`id\` BIGINT NOT NULL AUTO_INCREMENT,
  \`location\` VARCHAR(120) NOT NULL,
  \`space\` VARCHAR(80) NOT NULL,
  \`crop\` VARCHAR(100) NOT NULL,
  \`question\` VARCHAR(1000) NOT NULL,
  \`response_json\` MEDIUMTEXT NOT NULL,
  \`created_at\` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (\`id\`),
  INDEX \`idx_rec_location\` (\`location\`),
  INDEX \`idx_rec_crop\` (\`crop\`),
  INDEX \`idx_rec_created\` (\`created_at\` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`community_gallery\` (
  \`id\` BIGINT NOT NULL AUTO_INCREMENT,
  \`author_name\` VARCHAR(100) NOT NULL,
  \`location\` VARCHAR(120) NOT NULL,
  \`crop_title\` VARCHAR(100) NOT NULL,
  \`description\` VARCHAR(1000) NOT NULL,
  \`image_url\` VARCHAR(500) NOT NULL,
  \`likes\` INT NOT NULL DEFAULT 0,
  \`created_at\` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
  },
  {
    id: "android-main-xml",
    title: "activity_main.xml",
    category: "Android UI Layout",
    language: "xml",
    code: `<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout 
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#EFF3E9">

    <com.google.android.material.appbar.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="#315C42">

        <com.google.android.material.appbar.MaterialToolbar
            android:id="@+id/topAppBar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            app:title="CommonGround"
            app:subtitle="Urban Farming Knowledge Hub"
            app:titleTextColor="#FFFFFF"
            app:subtitleTextColor="#DCE8D5" />
    </com.google.android.material.appbar.AppBarLayout>

    <androidx.core.widget.NestedScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            android:padding="16dp">

            <!-- Location Input -->
            <com.google.android.material.textfield.TextInputLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:hint="Your Location / City"
                style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox">

                <com.google.android.material.textfield.TextInputEditText
                    android:id="@+id/etLocation"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:inputType="textPostalAddress" />
            </com.google.android.material.textfield.TextInputLayout>

            <!-- Submit Button -->
            <com.google.android.material.button.MaterialButton
                android:id="@+id/btnGetAdvice"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="16dp"
                android:text="Get Localized Advice"
                android:backgroundTint="#315C42"
                app:cornerRadius="8dp" />

            <!-- Recycler View for 6 Advice Cards -->
            <androidx.recyclerview.widget.RecyclerView
                android:id="@+id/rvAdviceCards"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="20dp" />
        </LinearLayout>
    </androidx.core.widget.NestedScrollView>

</androidx.coordinatorlayout.widget.CoordinatorLayout>`
  },
  {
    id: "android-item-card",
    title: "item_advice_card.xml",
    category: "Android UI Layout",
    language: "xml",
    code: `<?xml version="1.0" encoding="utf-8"?>
<com.google.android.material.card.MaterialCardView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginBottom="12dp"
    app:cardCornerRadius="12dp"
    app:cardElevation="3dp"
    app:strokeColor="#EBEAE2"
    app:strokeWidth="1dp">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="16dp">

        <TextView
            android:id="@+id/tvPillarTitle"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Pillar Title (e.g. Watering)"
            android:textSize="18sp"
            android:textStyle="bold"
            android:textColor="#315C42" />

        <TextView
            android:id="@+id/tvPillarAdvice"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:text="Localized recommendation description..."
            android:textSize="14sp"
            android:textColor="#556052"
            android:lineSpacingExtra="3dp" />
    </LinearLayout>
</com.google.android.material.card.MaterialCardView>`
  }
];
