package com.pcm.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pcm.Model.Role;


@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

}
