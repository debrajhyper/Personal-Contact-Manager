FROM maven:3.9.0-eclipse-temurin-17-alpine AS build
COPY . .
RUN mvn clean package

FROM openjdk:17
COPY --from=build /target/pcm-server.jar pcm-server.jar
EXPOSE 1010
ENTRYPOINT ["java","-jar","pcm-server.jar"]
