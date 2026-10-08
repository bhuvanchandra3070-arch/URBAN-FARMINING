# ==============================================================================
# Stage 1: Build the React + Vite Frontend
# ==============================================================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

# Install dependencies
COPY frontend/package*.json ./
RUN npm install

# Build the Vite production distribution
COPY frontend/ ./
RUN npm run build

# ==============================================================================
# Stage 2: Build the Spring Boot 3 + Java 25 Backend
# ==============================================================================
FROM maven:3.9.16-eclipse-temurin-25-alpine AS backend-builder
WORKDIR /app

# Cache Maven dependencies
COPY backend/pom.xml ./backend/
RUN mvn -f backend/pom.xml dependency:go-offline -B || true

# Copy backend source code
COPY backend/src ./backend/src

# Overlay freshly built frontend assets into Spring Boot's static folder
COPY --from=frontend-builder /app/frontend/dist/ ./backend/src/main/resources/static/

# Package executable JAR
RUN mvn -f backend/pom.xml clean package -DskipTests -B

# ==============================================================================
# Stage 3: Lightweight, Secure Production JRE 25 Runtime
# ==============================================================================
FROM eclipse-temurin:25-jre-alpine
WORKDIR /app

# Run as non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy the fat JAR
COPY --from=backend-builder /app/backend/target/*.jar app.jar

# Render injects PORT dynamically (defaults to 8080 locally)
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["sh", "-c", "exec java -Djava.security.egd=file:/dev/./urandom -Dserver.port=${PORT:-8080} -jar app.jar"]
