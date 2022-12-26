package com.citylist.db.postgresql;

import com.citylist.db.postgresql.entity.CityEntity;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityPostgresqlRepository extends JpaRepository<CityEntity, Long> {
    @NonNull
    Page<CityEntity> findByNameStartingWithIgnoreCase(@NonNull String name, @NonNull Pageable pageable);
}
