package com.example.estoque.service;

import com.example.estoque.dto.MaterialDTO;
import com.example.estoque.mapper.MaterialMapper;
import com.example.estoque.model.Material;
import com.example.estoque.repository.MaterialReposiory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@Service
public class MaterialService {
    private final MaterialReposiory materialReposiory;
    private final MaterialMapper mapper;

    public MaterialService(MaterialReposiory materialReposiory, MaterialMapper mapper) {
        this.materialReposiory = materialReposiory;
        this.mapper = mapper;
    }

    public List<MaterialDTO> findAll() {
        return materialReposiory.findAll().stream().map(mapper::toDTO).toList();
    }

    public Material findByName(String name) {
        return materialReposiory.findByName(name);
    }

    public MaterialDTO create(MaterialDTO material) {
        var m = materialReposiory.save(mapper.toEntity(material));
        return mapper.toDTO(m);
    }

    public void delete(Long id) {
        var material = materialReposiory.findById(id).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND));
        materialReposiory.delete(material);
    }

    public MaterialDTO update(Long id, MaterialDTO material) {
        if (material == null){throw new IllegalArgumentException("Não há dados para atualizar");}
        if (material.name().isBlank()){throw new IllegalArgumentException("Nome vazio");}
        var baseMaterial = materialReposiory.findById(id)
                .orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND));
        baseMaterial.setName(material.name());
        baseMaterial.setAmountStored(material.amountStored());
        var m = materialReposiory.save(baseMaterial);
        return mapper.toDTO(m);
    }

    public MaterialDTO findById(Long id) {
        return materialReposiory.findById(id)
                .map(mapper::toDTO)
                .orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND));
    }
}
