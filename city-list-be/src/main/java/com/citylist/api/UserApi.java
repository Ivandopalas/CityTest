package com.citylist.api;

import com.citylist.service.dto.BooleanResponseDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/user")
public interface UserApi {

    @GetMapping("/isEditAllowed")
    BooleanResponseDto getIsEditAllowed();
}
