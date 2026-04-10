package com.example.estoque.controller;

import com.example.estoque.dto.MaterialDTO;
import com.example.estoque.service.MaterialService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/materials")
public class MaterialController {

    private final MaterialService materialService;

    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }
    @GetMapping
    public ResponseEntity<List<MaterialDTO>> findAll() {
        return new ResponseEntity<>(materialService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaterialDTO> findById(@PathVariable Long id) {
        return new ResponseEntity<>(materialService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<MaterialDTO> create(@RequestBody MaterialDTO material) {
        var created = materialService.create(material);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        materialService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{id}/update")
    public ResponseEntity<MaterialDTO> update(@PathVariable Long id, @RequestBody MaterialDTO material) {
        var updatedMaterial = materialService.update(id,material);
        return new ResponseEntity<>(updatedMaterial, HttpStatus.OK);
    }
}
