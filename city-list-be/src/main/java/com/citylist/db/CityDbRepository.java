package com.citylist.db;

import com.citylist.db.postgresql.CityPostgresqlRepository;
import com.citylist.db.postgresql.entity.CityEntity;
import com.citylist.db.postgresql.mapper.DbMapper;
import com.citylist.service.dto.CityDto;
import com.citylist.service.dto.CitySearchDto;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CityDbRepository implements CityRepository {
    private final DbMapper dbMapper;
    private final CityPostgresqlRepository postgresqlRepository;

    @Override
    @NonNull
    public Page<CityDto> searchPage(@NonNull CitySearchDto searchDto, @NonNull Pageable pageable) {
        return postgresqlRepository
            .findByNameStartingWithIgnoreCase(searchDto.getName(), pageable)
            .map(dbMapper::toCityDto);
    }

    @Override
    @NonNull
    public CityDto findById(@NonNull Long id) {
        return postgresqlRepository
            .findById(id)
            .map(dbMapper::toCityDto)
            .orElseThrow(() -> new EntityNotFoundException(String.format("City not found for ID(%s)", id)));
    }

    @Override
    @NonNull
    public CityDto save(@NonNull CityDto city) {
        CityEntity dbCityEntity = dbMapper.toCityEntity(city);
        CityEntity savedCity = postgresqlRepository.save(dbCityEntity);
        return dbMapper.toCityDto(savedCity);
    }

    @Override
    @NonNull
    public List<CityDto> saveAll(@NonNull List<CityDto> cities) {
        List<CityEntity> dbCityEntities = cities
            .stream()
            .map(dbMapper::toCityEntity)
            .collect(Collectors.toList());
        List<CityEntity> savedCities = postgresqlRepository.saveAll(dbCityEntities);
        return savedCities
            .stream()
            .map(dbMapper::toCityDto)
            .collect(Collectors.toList());
    }
}
