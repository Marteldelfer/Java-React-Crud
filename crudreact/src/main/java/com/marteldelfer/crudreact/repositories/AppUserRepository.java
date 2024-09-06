package com.marteldelfer.crudreact.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marteldelfer.crudreact.models.AppUser;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, UUID>{
    
}