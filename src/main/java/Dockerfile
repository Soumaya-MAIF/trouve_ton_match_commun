
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:21-slim
COPY --from=build /app/target/trouve_ton_match-0.0.1-SNAPSHOT.jar ttm.jar
CMD ["java", "-jar", "/ttm.jar"]