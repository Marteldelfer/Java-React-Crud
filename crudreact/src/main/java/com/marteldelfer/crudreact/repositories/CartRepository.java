package com.marteldelfer.crudreact.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marteldelfer.crudreact.models.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, UUID>{
    
}