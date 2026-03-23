package com.example.estoque.repository;

import com.example.estoque.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByName(String name);

    @Query("SELECT DISTINCT p FROM products p LEFT JOIN FETCH p.billOfMaterials b LEFT JOIN FETCH b.material")
     List<Product> findAllWithMaterials();
    @Query("""
            SELECT DISTINCT b.id, b.material.name as materialName,
                        b.materialNeeded, b.material.id as materialId
            FROM BillOfMaterials b
            LEFT JOIN b.product p
            LEFT JOIN b.material m
            WHERE p.id = :id
            """)
    <T> List<T> findByIdWithMaterials(Long id, Class<T> type);
}
