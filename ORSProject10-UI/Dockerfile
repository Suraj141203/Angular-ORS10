# Use a stable and updated JDK base image (OpenJDK 17 via Eclipse Temurin)
FROM eclipse-temurin:17-jdk

# Set working directory inside container
WORKDIR /app

# Copy the Spring Boot JAR file into the container
COPY ./target/springboottest-0.0.1-SNAPSHOT.jar app.jar

# Expose the backend port
EXPOSE 8084

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
