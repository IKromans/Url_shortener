@echo off
start mvn spring-boot:run &
cd frontend\my-app && ng serve
pause