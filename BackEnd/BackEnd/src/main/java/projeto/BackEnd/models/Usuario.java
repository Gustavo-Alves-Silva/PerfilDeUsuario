package projeto.BackEnd.models;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Data
@Entity
public class Usuario implements Serializable {

    @Override
    public String toString() {
        return "UsuarioModel{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", idade=" + idade +
                ", estado='" + estado + '\'' +
                ", locradouro='" + locradouro + '\'' +
                ", numero=" + numero +
                ", biografia='" + biografia + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", usuarioCode='" + usuarioCode + '\'' +
                '}';
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false,  updatable = false)
    private Long id;

    private String nome;

    private int idade;

    private String estado;

    private String locradouro;

    private int numero;

    private String biografia;

    private String imageUrl;

    @Column(nullable = false, updatable = false)
    private String usuarioCode;
}
