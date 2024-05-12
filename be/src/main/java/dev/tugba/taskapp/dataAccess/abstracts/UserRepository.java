package dev.tugba.taskapp.dataAccess.abstracts;

import org.springframework.stereotype.Repository;

import dev.tugba.taskapp.entities.concretes.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    Optional<User> findById(int id);
}
