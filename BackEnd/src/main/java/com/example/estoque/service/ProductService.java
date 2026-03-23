package com.example.estoque.service;

import com.example.estoque.dto.ProductDTO;
import com.example.estoque.mapper.ProductMapper;
import com.example.estoque.model.Product;
import com.example.estoque.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper mapper;

    public ProductService(ProductRepository productRepository, ProductMapper mapper) {
        this.productRepository = productRepository;
        this.mapper = mapper;
    }

    public List<ProductDTO> findAll() {
        return productRepository.findAll().stream()
                .map(mapper::toDTO)
                .toList();
    }

    public Product findByName(String name) {
        return productRepository.findByName(name);
    }

    public ProductDTO findById(Long id) {
        return productRepository.findById(id)
                .map(mapper::toDTO)
                .orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND));
    }

    public ProductDTO create(ProductDTO product) {
        if (product == null) {
            throw new IllegalArgumentException("Produto inválido");
        }
        var p = productRepository.save(mapper.toEntity(product));
        return mapper.toDTO(p);
    }

    public void delete(Long id) {
        var product = productRepository.findById(id).orElseThrow();
        productRepository.delete(product);
    }

    public ProductDTO update(Long id, ProductDTO product) {
        if (product == null) {
            throw new IllegalArgumentException("Produto inválido");
        }
        if (product.value() < 0) { throw new IllegalArgumentException("Quantidade inválida");}
        if (product.name().isBlank()) {throw new IllegalArgumentException("Nome está vázio");}

        Product baseProduct = productRepository.findById(id).orElseThrow();
        baseProduct.setName(product.name());
        baseProduct.setValue(product.value());
        baseProduct.setAmountStored(product.amountStored());
        productRepository.save(baseProduct);
        return mapper.toDTO(baseProduct);
    }
}
