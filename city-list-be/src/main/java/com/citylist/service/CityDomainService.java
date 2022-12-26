package com.citylist.service;

import com.citylist.service.dto.CityDto;
import com.citylist.service.dto.CitySearchDto;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.InputStream;

public interface CityDomainService {

    @NonNull
    Page<CityDto> searchPage(@NonNull CitySearchDto searchDto, @NonNull Pageable pageable);

    @NonNull
    CityDto update(@NonNull CityDto updateDto);

    @NonNull
    CityDto get(@NonNull Long id);

    void upload(@NonNull InputStream inputStream);
}
