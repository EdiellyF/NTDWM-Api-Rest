package com.example.estoque.repository;

import com.example.estoque.model.BillOfMaterials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;

import java.util.List;
import java.util.Optional;

public interface BillOfMaterialsRepository extends JpaRepository<BillOfMaterials, Long> {

    <T> Optional<T> findDistinctByProductId(Long id, Class<T> type);
    <T> List<T> findAllProjectedBy(Class<T> type);
    <T> List<T> findAllDistinctProjectBy(Class<T> type);
    Optional<BillOfMaterials> findById(Long id);
    <T> Optional<T> findById(Long id, Class<T> type);
    boolean existsByProductIdAndMaterialId(Long  productId, Long materialId);

    @NativeQuery("SELECT p.name, p.value, p.amount_stored as \"stored\",\n" +
            "FLOOR(MIN(m.amount_stored / b.material_needed)) AS maxProd\n" +
            "FROM products p\n" +
            "INNER JOIN bill_of_materials b ON b.product_id = p.id\n" +
            "INNER JOIN materials m ON b.material_id = m.id\n" +
            "GROUP BY p.id, p.name\n" +
            "HAVING maxProd > 0;")
    <T> List<T>findAllAvailable(Class<T> type);
}
