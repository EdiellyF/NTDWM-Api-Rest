package com.example.estoque.controller;

import com.example.estoque.dto.*;
import com.example.estoque.service.BillOfMaterialsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/boms")
public class BillOfMaterialsController {

    private final BillOfMaterialsService bomService;

    public BillOfMaterialsController(BillOfMaterialsService bomService) {
        this.bomService = bomService;
    }

    @GetMapping("/")
    public ResponseEntity<List<BillOfMaterialsFocusDTO>> findAll(){
        var bom = bomService.findAllProductsWithBOM();
        return new ResponseEntity<>(bom, HttpStatus.OK);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<BillOfMaterialsFocusDTO> findByProductId(@PathVariable Long productId){
        var boms = bomService.findByProductId(productId);
        return new ResponseEntity<>(boms, HttpStatus.OK);
    }

    @GetMapping("/available")
    public ResponseEntity<List<ProductAvailableDTO>> findProductsAvailable(){
        var products = bomService.findAllAvailable();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<BillOfMaterialsDTO> create(@RequestBody BillOfMaterialsCreateDTO bom){
        var createdBom = bomService.create(bom);
        return new ResponseEntity<>(createdBom, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> delete(@PathVariable Long id){
        bomService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{id}/update")
    public ResponseEntity<BillOfMaterialsDTO> update(@PathVariable Long id, @RequestBody BillOfMaterialsCreateDTO bom){
        var updatedBom = bomService.update(id, bom);
        return new ResponseEntity<>(updatedBom, HttpStatus.OK);
    }

    @GetMapping("/getAllProducts")
    public ResponseEntity<List<ProductForBomDTO>> getAllProducts(){
        var products = bomService.getProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/product/{productId}/materials")
    public ResponseEntity<List<BomDTO>> getMaterialsByProductId(@PathVariable Long productId){
        var products = bomService.getProductsById(productId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
