import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { UsuarioLogado } from "../models/usuario_logado";
import { Carrinho } from "../models/carrinho";

@Injectable()
export class StorageService {

    getUsuarioLogado() : UsuarioLogado {
        let usuario = localStorage.getItem(STORAGE_KEYS.usuarioLogado);
        if (usuario == null) {
            return null;
        }
        else {
            return JSON.parse(usuario);
        }
    }

    setUsuarioLogado(usuario : UsuarioLogado) {
        if (usuario == null) {
            localStorage.removeItem(STORAGE_KEYS.usuarioLogado);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.usuarioLogado, JSON.stringify(usuario));
        }
    }

    getCarrinho() : Carrinho {
        let carrinho = localStorage.getItem(STORAGE_KEYS.carrinho);
        if (carrinho == null) {
            return null;
        } else {
            return JSON.parse(carrinho);
        }
    }

    setCarrinho(carrinho : Carrinho) {
        if (carrinho == null) {
            localStorage.removeItem(STORAGE_KEYS.carrinho);
        } else {
            localStorage.setItem(STORAGE_KEYS.carrinho, JSON.stringify(carrinho));
        }
    }

}