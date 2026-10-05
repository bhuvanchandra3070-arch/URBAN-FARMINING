-- ====================================================================
-- Urban Farming Community Knowledge Hub - MySQL 8.0 Production DDL Schema
-- Database: urbanfarm
-- ====================================================================

CREATE DATABASE IF NOT EXISTS `urbanfarm` 
  DEFAULT CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE `urbanfarm`;

-- 1. Recommendation Requests & Localized Advice Table
CREATE TABLE IF NOT EXISTS `recommendation_requests` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `location` VARCHAR(120) NOT NULL,
  `space` VARCHAR(80) NOT NULL,
  `crop` VARCHAR(100) NOT NULL,
  `question` VARCHAR(1000) NOT NULL,
  `response_json` MEDIUMTEXT NOT NULL,
  `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  INDEX `idx_rec_location` (`location`),
  INDEX `idx_rec_crop` (`crop`),
  INDEX `idx_rec_created` (`created_at` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Community Harvest Gallery Table
CREATE TABLE IF NOT EXISTS `community_gallery` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `author_name` VARCHAR(100) NOT NULL,
  `location` VARCHAR(120) NOT NULL,
  `crop_title` VARCHAR(100) NOT NULL,
  `description` VARCHAR(1000) NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `likes` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  INDEX `idx_gallery_crop` (`crop_title`),
  INDEX `idx_gallery_created` (`created_at` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Initial Seed Data
INSERT INTO `community_gallery` (`author_name`, `location`, `crop_title`, `description`, `image_url`, `likes`, `created_at`) 
VALUES 
('Ananya Sharma', 'Bengaluru, Balcony', 'Cherry Tomatoes & Basil', 'Harvested 1.2 kg of sweet cherry tomatoes from 2 grow bags on my 4th floor balcony!', 'https://images.unsplash.com/photo-1592417817098-8f3d6ef231fe?w=800&auto=format&fit=crop&q=80', 24, NOW()),
('Karthik Varma', 'Hyderabad, Terrace', 'Palak & Coriander', 'Zero-chemical lush green spinach harvest using cocopeat + vermicompost (50:50) mix.', 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&auto=format&fit=crop&q=80', 41, NOW());
