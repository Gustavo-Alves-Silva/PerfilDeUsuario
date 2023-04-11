package projeto.BackEnd.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import projeto.BackEnd.models.Usuario;

public interface UsuarioRepo extends JpaRepository<Usuario, Long> {


}
