package com.martel.crud;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.martel.crud.product.Product;
import com.martel.crud.product.ProductService;

import lombok.RequiredArgsConstructor;

@SpringBootApplication
@RequiredArgsConstructor
public class CrudApplication {

	private final ProductService service;

	public static void main(String[] args) {
		SpringApplication.run(CrudApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner() {
		return args -> {
			service.save(Product.builder()
				.name("Testing")
				.quantity(10)
				.price(1.5f)
				.build());
			service.save(Product.builder()
				.name("Testing again")
				.quantity(10)
				.price(1.5f)
				.build());
		};
	}

}
