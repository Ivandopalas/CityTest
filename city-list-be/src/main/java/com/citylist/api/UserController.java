package com.citylist.api;

import com.citylist.config.SecurityRoles;
import com.citylist.service.dto.BooleanResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController implements UserApi {
    @Override
    public BooleanResponseDto getIsEditAllowed() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return new BooleanResponseDto(authentication.getAuthorities().stream()
            .anyMatch(r -> r.getAuthority().equals("ROLE_ALLOW_EDIT")));
    }
}
