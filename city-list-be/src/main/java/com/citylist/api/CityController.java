package com.citylist.api;

import com.citylist.service.dto.CityDto;
import com.citylist.service.dto.CitySearchDto;
import com.citylist.service.CityDomainService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
public class CityController implements CityApi {
    private final CityDomainService cityDomainService;

    @Override
    public CityDto getById(Long id) {
        return cityDomainService.get(id);
    }

    @Override
    public Page<CityDto> searchPage(CitySearchDto searchDto, Pageable pageable) {
        return cityDomainService.searchPage(searchDto, pageable);
    }

    @Override
    public CityDto update(CityDto cityDto) {
        return cityDomainService.update(cityDto);
    }

    @Override
    public void handleCsvCityUpload(MultipartFile file) {
        try {
            cityDomainService.upload(file.getInputStream());
        } catch (IOException e) {
            // TODO handle exception
            throw new RuntimeException(e);
        }
    }
}
