package com.example.estoque.service;

import com.example.estoque.dto.*;
import com.example.estoque.mapper.BillOfMaterialMapper;
import com.example.estoque.model.Product;
import com.example.estoque.repository.BillOfMaterialsRepository;
import com.example.estoque.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@Service
public class BillOfMaterialsService {
    private final BillOfMaterialsRepository bomRepository;
    private final ProductRepository productRepository;
    private final BillOfMaterialMapper bomMapper;

    public BillOfMaterialsService(BillOfMaterialsRepository bomRepository, ProductRepository productRepository, BillOfMaterialMapper bomMapper) {
        this.bomRepository =  bomRepository;
        this.productRepository = productRepository;
        this.bomMapper = bomMapper;
    }

    public List<BillOfMaterialsDTO> findAll() {
        return bomRepository.findAllProjectedBy(BillOfMaterialsDTO.class)
                .stream()
                .toList();
    }

    public List<BillOfMaterialsFocusDTO> findAllProductsWithBOM() {
        return bomRepository.findAllDistinctProjectBy(BillOfMaterialsFocusDTO.class)
                .stream()
                .toList();
    }

    public BillOfMaterialsFocusDTO findByProductId(Long id){
        return bomRepository.findDistinctByProductId(id, BillOfMaterialsFocusDTO.class)
                .orElseThrow();
    }

    public BillOfMaterialsDTO findById(Long id){
        var bom = bomRepository.findById(id).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND));
        return bomMapper.toDTO(bom);
    }

    public BillOfMaterialsDTO create(BillOfMaterialsCreateDTO bom) {
        if (exists(bom)){throw new HttpClientErrorException(HttpStatus.CONFLICT);}
        var entity = bomMapper.toEntity(bom);
        bomRepository.save(entity);
        return bomRepository.findById(entity.getId())
                .map(bomMapper::toDTO)
                .orElseThrow();
    }

    public void delete(Long id) {
        var bom = bomRepository.findById(id).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND));
        bomRepository.delete(bom);
    }

    public BillOfMaterialsDTO update(Long id, BillOfMaterialsCreateDTO bom) {
        if (bom == null){throw new IllegalArgumentException("Bill Of Materials não pode ser nulo.");}
        if (bom.materialId() == null){throw new IllegalArgumentException("Materia prima não pode ser nula.");}
        if (bom.materialNeeded() == null || bom.materialNeeded() < 0){throw new IllegalArgumentException("Quantidade não pode ser negativa");}

        var baseBom = bomRepository.findById(id).orElseThrow();
        baseBom.setMaterialNeeded(bom.materialNeeded());
        var result = bomMapper.toDTO(baseBom);
        bomRepository.save(baseBom);
        return result;
    }

    public boolean exists(BillOfMaterialsCreateDTO dto){
        return bomRepository.existsByProductIdAndMaterialId(dto.productId(), dto.materialId());
    }

    public List<ProductAvailableDTO> findAllAvailable() {
        return bomRepository.findAllAvailable(ProductAvailableDTO.class);
    }

    public List<ProductForBomDTO> getProducts() {
        List<Product> products = productRepository.findAllWithMaterials();

        return products.stream().map(p -> new ProductForBomDTO(
                p.getId(),
                p.getName(),
                p.getBillOfMaterials().stream()
                        .map(bom -> new BomDTO(
                                bom.getId(),
                                bom.getMaterial().getName(),
                                bom.getMaterialNeeded(),
                                bom.getMaterial().getId()
                        )).toList()
        )).toList();
    }

    public List<BomDTO> getProductsById(Long id) {
        var products = productRepository.findByIdWithMaterials(id, BomDTO.class);

        return products.stream().toList();
    }
}
