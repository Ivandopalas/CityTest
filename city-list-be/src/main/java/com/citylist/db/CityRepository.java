package com.citylist.db;

import com.citylist.service.dto.CityDto;
import com.citylist.service.dto.CitySearchDto;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CityRepository {
    @NonNull
    Page<CityDto> searchPage(@NonNull CitySearchDto searchDto, @NonNull Pageable pageable);

    @NonNull
    CityDto findById(@NonNull Long id);

    @NonNull
    CityDto save(@NonNull CityDto city);

    @NonNull
    List<CityDto> saveAll(@NonNull List<CityDto> cities);
}
