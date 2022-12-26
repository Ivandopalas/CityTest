## Start
- `docker-compose up -d` 
- `spring.jpa.hibernate.ddl-auto`  set to `create` in case you run 1st time.
- `mvn clean install` `mvn spring-boot:run`
- `http://localhost:8080`
## Users
- `user:password`
- `admin:password`
## TBD
Known stuff to be improved:
- Error handling on FE / BE.
- Input Validators.
- DB updates and initial rollout to be managed via liquibase.
- Auth system migrated to external like OKTA.
- FE styling.
- FE standalone deployment to reduce traffic load on BE server.
- Separate domains for BE and FE. Proper CORS manintenance in that case.
- Deployment pipelines
- Dev and prod profiling for BE app.