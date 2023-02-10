package com.example.urlshortenertdd;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping()
@CrossOrigin(origins = "http://localhost:4200")
class UrlController {

    private final UrlService urlService;

    @Autowired
    private UrlController(UrlService urlService) {
        this.urlService = urlService;
    }

    @PostMapping("my-app/shorten")
    private ResponseEntity<Map<String, String>> convertToShortUrl(@RequestBody UrlLongRequest request) {
        String shortUrl = urlService.convertLongUrlToShortUrl(request);
        Map<String, String> response = new HashMap<>();
        response.put("shortUrl", shortUrl);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "my-app/{shortUrl}")
    private ResponseEntity<String> getAndRedirect(@PathVariable String shortUrl) {
        try {
            var url = urlService.getOriginalUrl(shortUrl);
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create(url))
                    .build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("The URL you requested could not be found or has expired.");
        }
    }

}
