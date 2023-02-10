@echo off
start mvn spring-boot:run &
cd src\frontend\my-app && ng serve
pause