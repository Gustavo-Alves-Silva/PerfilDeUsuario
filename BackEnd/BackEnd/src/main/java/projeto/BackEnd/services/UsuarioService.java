package projeto.BackEnd.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projeto.BackEnd.models.Usuario;
import projeto.BackEnd.repo.UsuarioRepo;

import java.util.List;
import java.util.UUID;

@Service
public class UsuarioService {

    private final UsuarioRepo usuarioRepo;
    @Autowired
    public UsuarioService(UsuarioRepo usuarioRepo){
        this.usuarioRepo = usuarioRepo;
    }

    public List<Usuario> findAllUsuarios() {
        return usuarioRepo.findAll();
    }

    public Usuario addUsuario(Usuario usuario) {
        usuario.setUsuarioCode(UUID.randomUUID().toString());
        return usuarioRepo.save(usuario);
    }

    public Usuario updateUsuario(Usuario usuario) {
        return usuarioRepo.save(usuario);
    }

    public void deleteUsuario(Long id) {
        usuarioRepo.deleteById(id);
    }

}
