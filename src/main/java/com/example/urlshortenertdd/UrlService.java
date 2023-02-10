package com.example.urlshortenertdd;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
class UrlService {

    private final UrlRepository urlRepository;
    private final UrlConversion urlConversion;

    @Autowired
    private UrlService(UrlRepository urlRepository, UrlConversion urlConversion) {
        this.urlRepository = urlRepository;
        this.urlConversion = urlConversion;
    }

    String convertLongUrlToShortUrl(UrlLongRequest request) {
        var url = new Url();
        url.setLongUrl(request.getLongUrl());
        url.setExpiresDate(request.getExpiresDate());
        url.setCreatedDate(new Date());
        var entity = urlRepository.save(url);
        return urlConversion.encode(entity.getId());
    }

    String getOriginalUrl(String shortUrl) {
        var id = urlConversion.decode(shortUrl);
        var entity = urlRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("There is no entity with " + shortUrl));
        if (entity.getExpiresDate() != null && entity.getExpiresDate().before(new Date())) {
            urlRepository.delete(entity);
            throw new EntityNotFoundException("Link expired!");
        }
        return entity.getLongUrl();
    }
}
