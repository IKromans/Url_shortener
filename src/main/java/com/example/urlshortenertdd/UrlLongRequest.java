package com.example.urlshortenertdd;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
class UrlLongRequest {

    private String longUrl;

    private Date expiresDate;

}
