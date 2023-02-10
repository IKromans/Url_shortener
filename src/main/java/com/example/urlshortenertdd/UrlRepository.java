package com.example.urlshortenertdd;

import org.springframework.data.jpa.repository.JpaRepository;

interface UrlRepository extends JpaRepository<Url, Long> {
}

