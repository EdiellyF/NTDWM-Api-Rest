package com.example.estoque.repository;

import com.example.estoque.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialReposiory extends JpaRepository<Material, Long> {
    Material findByName(String name);
}
