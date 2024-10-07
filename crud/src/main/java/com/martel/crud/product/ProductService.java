package com.martel.crud.product;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.UUID;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    
    private final ProductRepository repository;

    public Product save(Product product) {
        product.setCreatedAt(new Date());
        return repository.save(product);
    }
    public Product edit(UUID id, Product newProduct) {
        newProduct.setCreatedAt(repository.findById(id).get().getCreatedAt());
        newProduct.setId(id);
        return repository.save(newProduct);
    }

    public void delete(UUID id) {
        repository.deleteById(id);
    }

    public Product getProduct(UUID id) {
        return repository.findById(id).get();
    }

    public List<Product> getAllProducts() {
        return repository.findAll();
    }
}
