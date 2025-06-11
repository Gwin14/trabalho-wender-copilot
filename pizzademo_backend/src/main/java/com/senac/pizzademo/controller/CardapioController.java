package com.senac.pizzademo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.senac.pizzademo.model.Cardapio;
import com.senac.pizzademo.repository.CardapioRepository;

@RestController
@RequestMapping({ "/cardapio", "/menu" })
@CrossOrigin(origins = { "http://localhost:3000", "http://backend:8080" }) // Permite frontend local e docker
public class CardapioController {

    @Autowired
    private CardapioRepository cardapioRepository;

    @GetMapping
    public List<Cardapio> getAllCardapios() {
        return cardapioRepository.findAll();
    }

    @PostMapping
    public Cardapio createCardapio(@RequestBody Cardapio cardapio) {
        return cardapioRepository.save(cardapio);
    }

    // Get a single Cardapio by ID
    @GetMapping("/{id}")
    public Cardapio getCardapioById(@PathVariable Long id) {
        return cardapioRepository.findById(id).orElseThrow(() -> new RuntimeException("Cardapio not found"));
    }

    // Update a Cardapio by ID
    @PutMapping("/{id}")
    public Cardapio updateCardapio(@PathVariable Long id, @RequestBody Cardapio cardapioDetails) {
        Cardapio cardapio = cardapioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cardapio not found"));
        // Update fields as needed
        cardapio.setNome(cardapioDetails.getNome());
        cardapio.setDescricao(cardapioDetails.getDescricao());
        cardapio.setPreco(cardapioDetails.getPreco());
        // Add other fields if necessary
        return cardapioRepository.save(cardapio);
    }

    // Delete a Cardapio by ID
    @DeleteMapping("/{id}")
    public void deleteCardapio(@PathVariable Long id) {
        cardapioRepository.deleteById(id);
    }
}
