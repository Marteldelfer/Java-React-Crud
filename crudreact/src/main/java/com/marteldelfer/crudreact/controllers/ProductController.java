package com.marteldelfer.crudreact.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marteldelfer.crudreact.models.Product;
import com.marteldelfer.crudreact.repositories.ProductRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final Logger log = LoggerFactory.getLogger(ProductController.class);
    
    @Autowired
    private ProductRepository productRepo;

    @GetMapping("/products")
    Collection<Product> products() {
        return productRepo.findAll();
    }

    @GetMapping("/product/{id}")
    ResponseEntity<?> getProduct(@PathVariable UUID id) {
        Optional<Product> product = productRepo.findById(id);
        return product.map(response -> ResponseEntity.ok().body(response))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/product")
    ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) throws URISyntaxException {
        log.info("Request to update product: {}", product);
        Product result = productRepo.save(product);
        return ResponseEntity.created(new URI("/api/product/" + result.getId())).body(result);
    }

    @PutMapping("/product/{id}")
    ResponseEntity<?> updateProduct(@Valid @RequestBody Product product) {
        log.info("Request to update product: {}", product);
        Product result = productRepo.save(product);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/product/{id}")
    ResponseEntity<?> deleteProduct(@PathVariable UUID id) {
        log.info("Request to delete: {}", id);
        productRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
