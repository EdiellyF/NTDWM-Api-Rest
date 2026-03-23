package com.example.estoque.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity (name = "materials")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String name;
    private int amountStored;
    @OneToMany( mappedBy = "material", cascade = CascadeType.ALL)
    private Set<BillOfMaterials> billOfMaterials;

    public void setAmountStored(Integer amountStored){
        if (amountStored<0){
            throw new IllegalArgumentException("Quantidade informada inválida!");
        }
        this.amountStored = amountStored;
    }
}
